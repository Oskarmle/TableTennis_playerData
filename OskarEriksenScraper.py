import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import os

def scrapPlayer():
    # Set up Selenium WebDriver (Chrome in this case)
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    # Open the webpage
    driver.get("https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#343985,59,7467244,42024")
    
    # Wait for the page to fully load
    time.sleep(5)  # Adjust based on page loading time
    
    # Get the page source after JavaScript has rendered the content
    page_source = driver.page_source
    
    # Parse the HTML with BeautifulSoup
    soup = BeautifulSoup(page_source, "html.parser")
    
    # Find the table by class
    table = soup.find('table', {'class': 'playerprofilerankingpointstable'})
    
    # Find all rows in the table
    rows = table.find_all('tr')

    # Initialize variables to store the last seen date and tournament name
    last_date = ""
    last_tournament_name = ""

    # Prepare a list to hold the scraped data
    new_data = []

    # Loop through rows starting from the 3rd row (index 2) and extract data
    for row in rows[2:]:
        columns = row.find_all('td')
        if columns:
            # Get the current date from the first <td>
            current_date = columns[0].text.strip() if columns[0] else ''
            
            # Update last_date only if current_date is not empty
            if current_date:
                last_date = current_date
            
            # Get the current tournament name from the second <td>
            current_tournament_name = columns[1].text.strip() if columns[1] else ''
            
            # Update last_tournament_name only if current_tournament_name is not empty
            if current_tournament_name:
                last_tournament_name = current_tournament_name
            
            # Player data is in the third <td>
            player_link = columns[2].find('a')['href'] if columns[2].find('a') else ''
            player_name = columns[2].find('a').text.strip() if columns[2].find('a') else ''
            
            # Points data is in subsequent <td>s
            points1 = columns[3].text.strip() if len(columns) > 3 else ''
            points2 = columns[4].text.strip() if len(columns) > 4 else ''
            points3 = columns[5].text.strip() if len(columns) > 5 else ''

            # Create a new entry
            new_entry = {
                "id": "BH",  # Add the fixed ID
                "date": last_date,
                "tournament": last_tournament_name,
                "player": {
                    "name": player_name,
                    "link": player_link
                },
                "points": [points1, points2, points3]
            }

            # Append to new data only if it's not already in the list
            new_data.append(new_entry)

    # Check if the JSON file already exists
    if os.path.exists('player_data.json'):
        with open('player_data.json', 'r') as json_file:
            existing_data = json.load(json_file)

        # Create a set of existing entries for fast lookup
        existing_entries = {json.dumps(entry, sort_keys=True) for entry in existing_data}

        # Filter new data to remove duplicates
        unique_data = [entry for entry in new_data if json.dumps(entry, sort_keys=True) not in existing_entries]
    else:
        unique_data = new_data

    # Combine existing data with new unique data
    combined_data = existing_data + unique_data if os.path.exists('player_data.json') else unique_data

    # Save the combined data to the JSON file
    with open('player_data.json', 'w') as json_file:
        json.dump(combined_data, json_file, indent=4)

    # Close the browser
    driver.quit()

# Call the function
scrapPlayer()
