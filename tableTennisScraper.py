import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

def scrapPlayer():
    # Set up Selenium WebDriver (Chrome in this case)
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    # Open the webpage
    driver.get("https://www.bordtennisportalen.dk/DBTU/Spiller/VisSpiller/#319068,59,7457598,42024")
    
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
    data = []

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

            # Append the data to the list
            data.append({
                "date": last_date,
                "tournament": last_tournament_name,
                "player": {
                    "name": player_name,
                    "link": player_link
                },
                "points": [points1, points2, points3]
            })

    # Save the data to a JSON file
    with open('player_data.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)

    # Close the browser
    driver.quit()

# Call the function
scrapPlayer()
