import json
import hashlib  # For generating unique gameID
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables from .env file
load_dotenv()

username = os.getenv('MONGODB_USER')
password = os.getenv('MONGODB_PASS')

# Use connection string with credentials from environment variables
connection_string = f"mongodb+srv://{username}:{password}@tabletennis0.u10qa.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)

# List of player information containing ID and URL
players = [
    {"id": "PE", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#305214,59,7467481,42024"},
    {"id": "BH", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#343985,59,7467244,42024"},
    {"id": "CN", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#316342,59,7482751,42024"},
    {"id": "DS", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#142898,59,7452335,42024"},
    {"id": "FB", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#328783,59,7465770,42024"},
    {"id": "HP", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#343754,59,7478937,42024"},
    {"id": "HW", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#141533,59,7449840,42024"},
    {"id": "JOJ", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#340787,59,7478179,42024"},
    {"id": "JR", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#342680,59,7466419,42024"},
    {"id": "KS", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#343104,59,7477982,42024"},
    {"id": "MB", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#151637,59,7470091,42024"},
    {"id": "MR", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#319070,59,7457754,42024"},
    {"id": "NK", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#317843,59,7481672,42024"},
    {"id": "NZ", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#346720,59,7478163,42024"},
    {"id": "OMLE", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#319068,59,7457598,42024"},
    {"id": "SM", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#329787,59,7478266,42024"},
    {"id": "SN", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#326538,59,7470020,42024"},
    {"id": "TD", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#326539,59,7459788,42024"},
    {"id": "TL", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#145074,59,7452597,42024"},
    {"id": "NW", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#132936,59,7459242,42024"},
    {"id": "HS", "url": "https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#347786,59,7484507,42024"},

    # Add other players here
]

def scrapPlayer(player):
    # Set up Selenium WebDriver (Chrome in this case)
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    # Load the player's URL
    driver.get(player["url"])

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
            if current_date:
                last_date = current_date
            
            # Get the current tournament name from the second <td>
            current_tournament_name = columns[1].text.strip() if columns[1] else ''
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
                "id": player["id"],
                "date": last_date,
                "tournament": last_tournament_name,
                "player": {
                    "name": player_name,
                    "link": player_link
                },
                "points": [points1, points2, points3]
            }

            # Append to new data
            new_data.append(new_entry)

    # Close the browser
    driver.quit()

    # Insert data into MongoDB
    insert_to_mongodb(new_data, player["id"])

def insert_to_mongodb(data, specific_id):
    db = client["tabletennis"]  # Database name
    collection = db["players"]  # Collection 

    # Count existing records in the database with the specified ID
    existing_count = collection.count_documents({"id": specific_id})  # Count records with ID
    print(f"Existing records in the database for ID '{specific_id}': {existing_count}")

    # Filter the new data for the specific ID
    new_entries_for_id = [entry for entry in data if entry["id"] == specific_id]

    # Count how many new entries there are for the specific ID
    new_count = len(new_entries_for_id)
    print(f"New entries for ID '{specific_id}' in scraper array: {new_count}")

    # Calculate how many new records need to be inserted
    records_to_insert = new_count - existing_count

    # Prepare to insert new records
    inserted_count = 0

    # Only insert if there are more new entries than existing entries
    if records_to_insert > 0:
        # Insert only the last 'records_to_insert' entries from new_entries_for_id
        entries_to_insert = new_entries_for_id[-records_to_insert:]  # Get the last records_to_insert entries

        for entry in entries_to_insert:
            # Insert the new entry
            collection.insert_one(entry)
            inserted_count += 1
            print(f"Inserted new entry for ID '{specific_id}': {entry}")
    
    else:
        print(f"No new records to insert for ID '{specific_id}'.")

    print(f"Inserted {inserted_count} new records into MongoDB for ID '{specific_id}'.")

# Call the scraping function for each player
for player in players:
    scrapPlayer(player)
