# Precise-Weather-App

## Introduction

This was my sixth homework assignment. In order to complete the acceptance criteria, we must accomplish the following:

```md
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## APIs

I used openweathermap API for this application. This api displayed city, temp, wind, humidity, wind velocity and UV index. It also contained future weather conditions with icons.

## Functions and Setting Variables
 
Reverse-engineering again came into play. I researched some other web applications that were weather apps to understand how to build my variables. To begin I set a variable called cities that would call all cities into an array. This array would display on the aside as local storage. Then I created variables for the user input and its result so that they can display in the main container. I created forecast elements to display the 5 day forecasts within their respective cards.


## Misc
  
Comments were added for clarity. I also added some spacing for legibility purposes.

## Lessons Learned

PRACTICE PRACTICE PRACTICE & RESEARCH RESEARCH RESEARCH. REPEAT. JS is not going anywhere. I also used console.log a ton for this website. It helped to see how the response and data were interacting. Once I was able to see how objects were indexed, the homework began clicking.

## URL

https://wstaylor27.github.io/Precise-Weather-App/

![image](https://user-images.githubusercontent.com/54382901/133535863-f1d219a5-0661-4c85-a5bb-f703ba761583.png)
