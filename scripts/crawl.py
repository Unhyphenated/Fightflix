# import requests
# from bs4 import BeautifulSoup

# # The URL of the UFC event page on Wikipedia
# url = "https://en.wikipedia.org/wiki/UFC_280"

# # Send a request to the webpage
# response = requests.get(url)
# soup = BeautifulSoup(response.text, 'html.parser')

# # Extract the title of the event
# title = soup.find('h1', id='firstHeading').text

# # Extract the date of the event from the infobox, using 'string' instead of 'text'
# date = soup.find('table', class_='infobox').find('th', string='Date').find_next_sibling('td').text

# # Extract a basic description from the first paragraph
# description = soup.find('div', class_='mw-parser-output').p.text

# # Extract the URL to the event poster from the infobox
# # More robust handling of cases where elements might not exist
# infobox_image_div = soup.find('table', class_='infobox')
# if infobox_image_div:
#     poster_element = infobox_image_div.find('a')
#     # Find the <img> tag and extract the 'src' attribute
#     img_tag = soup.find('img', class_='mw-file-element')
#     img_url = img_tag['src'] if img_tag else 'Image URL not found'

# # Append the protocol to make the URL complete
#     poster_url = f"https:{img_url}"
# else:
#     poster_url = 'No poster URL found'

# # Print extracted information
# print(f"Title: {title}")
# print(f"Date: {date}")
# print(f"Description: {description}")
# print(f"Poster URL: {poster_url}")

import requests
from bs4 import BeautifulSoup
import json
import uuid

def fetch_ufc_event_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    title = soup.find('h1', id='firstHeading').text if soup.find('h1', id='firstHeading') else "Title not found"
    
    # More robust handling for date extraction
    date_th = soup.find('th', string=lambda text: text and 'Date' in text)
    date = date_th.find_next_sibling('td').text if date_th and date_th.find_next_sibling('td') else "Date not found"
    
    description = soup.find('div', class_='mw-parser-output').p.text if soup.find('div', class_='mw-parser-output') and soup.find('div', class_='mw-parser-output').p else "Description not available"
    
    # More robust handling for poster URL extraction
    infobox_image_div = soup.find('table', class_='infobox')
    if infobox_image_div:
        img_tag = infobox_image_div.find('img', class_='mw-file-element')
        poster_url = f"https:{img_tag['src']}" if img_tag and 'src' in img_tag.attrs else "No poster URL found"
    else:
        poster_url = 'No poster URL found'

    return {
        'id': str(uuid.uuid4()),
        'title': title,
        'description': description,
        'videoUrl': '',
        'thumbnailUrl': poster_url
    }

def scrape_all_ufc_events(list_url):
    response = requests.get(list_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    links = soup.select('table.wikitable a[href]')
    event_urls = {f"https://en.wikipedia.org{a['href']}" for a in links if 'wiki/UFC_' in a['href']}

    events_data = []
    for url in event_urls:
        try:
            event_data = fetch_ufc_event_data(url)
            events_data.append(event_data)
            print(f"Data fetched for {event_data['title']}")
        except Exception as e:
            print(f"Failed to fetch data for {url}: {str(e)}")

    return events_data

# URL for the list of UFC events page on Wikipedia
list_of_ufc_events_url = "https://en.wikipedia.org/wiki/List_of_UFC_events"
all_events_data = scrape_all_ufc_events(list_of_ufc_events_url)

# Print all events data
print(json.dumps(all_events_data, indent=4))

# Optionally, save the data to a JSON file
with open('ufc_events_all.json', 'w') as file:
    json.dump(all_events_data, file, indent=4)
