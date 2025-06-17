import requests
from bs4 import BeautifulSoup
import os
import time

def scrape_seinfeld_scripts():
    base_url = "https://www.seinfeldscripts.com/"
    main_page_url = base_url + "seinfeld-scripts.html"
    output_directory = "seinfeld_scripts"

    # Define a User-Agent header to mimic a web browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Create the output directory if it doesn't exist
    os.makedirs(output_directory, exist_ok=True)

    print(f"Fetching main page: {main_page_url}")
    try:
        response = requests.get(main_page_url, headers=headers)
        response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching main page: {e}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all links on the main page. The links to scripts seem to be simple .htm or .html files.
    # We'll look for links that are likely episode scripts by checking their href.
    script_links = []
    # The links are in various places, some within tables. Let's find all <a> tags
    # and filter them to find the script links.
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and (href.endswith('.htm') or href.endswith('.html')) and 'seinfeld-scripts.html' not in href and 'gift' not in href.lower():
            # Exclude obvious non-script links and the main page itself
            # Check if the text content of the link looks like an episode title
            link_text = link.get_text(strip=True)
            # Basic check for episode title pattern (e.g., "The Episode Title")
            if len(link_text) > 5 and 'The ' in link_text:
                script_links.append((link_text, href.strip())) # Strip whitespace from href here


    if not script_links:
        print("No script links found on the main page. Please check the HTML structure.")
        return

    print(f"Found {len(script_links)} potential script links. Starting to scrape...")

    for episode_title, relative_path in script_links:
        episode_url = base_url + relative_path # Corrected: Re-add base_url
        # Clean up the episode title for a valid filename, removing newlines as well
        cleaned_episode_title = episode_title.replace('\n', '').replace('\r', '').strip()
        filename = f"{cleaned_episode_title.replace(' ', '_').replace('/', '_').replace(':', '').replace('(', '').replace(')', '')}.txt"
        file_path = os.path.join(output_directory, filename)

        if os.path.exists(file_path):
            print(f"Skipping {episode_title}: already exists.")
            continue

        print(f"Fetching script for: {episode_title} from {episode_url}") # Display full URL
        try:
            episode_response = requests.get(episode_url, headers=headers)
            episode_response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching {episode_title} ({episode_url}): {e}") # Display full URL in error
            continue

        episode_soup = BeautifulSoup(episode_response.text, 'html.parser')

        # --- IMPORTANT PART: Identifying the script content ---
        # This is where we need to be smart about finding the actual script text.
        # Common patterns: <pre> tags, <div>s with specific classes/ids, or just large text blocks.
        # Let's try to find elements that are likely to contain the main script content.
        script_content_candidates = []
        # Look for <pre> tags, often used for pre-formatted text like scripts
        script_content_candidates.extend(episode_soup.find_all('pre'))
        # Look for divs that contain a lot of text, or might have script-related classes/ids
        # (This is a generic approach; you might need to adjust based on visual inspection)
        # Often, the main content is within a <td> or <div> that holds most of the text.
        # Let's try to find a <div> or <td> that contains a large amount of text
        for tag in ['div', 'td']:
            for element in episode_soup.find_all(tag):
                # Simple check: if the element has significant text, it might be the script
                if len(element.get_text(strip=True)) > 500: # Arbitrary length for script content
                    script_content_candidates.append(element)

        script_text = ""
        # Prioritize <pre> tags as they are typically used for this
        if script_content_candidates:
            # Sort by length to pick the largest text block (most likely the script)
            best_candidate = max(script_content_candidates, key=lambda x: len(x.get_text(strip=True)))
            script_text = best_candidate.get_text(separator='\n', strip=True)
        else:
            print(f"Could not find likely script content for {episode_title}. You may need to manually inspect its page.")
            continue


        if script_text:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(script_text)
            print(f"Successfully scraped and saved: {filename}")
        else:
            print(f"No script text extracted for {episode_title}.")

        # Be respectful: add a delay to avoid overwhelming the server
        time.sleep(1) # Wait for 1 second between requests

    print("\nScraping complete!")
    print(f"All scripts saved to the '{output_directory}' directory.")

# To run this script, you would call:
scrape_seinfeld_scripts()