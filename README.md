# volStoryAPI
volStory is an web app created to serve as a platform where people can create event's follow event's &amp; support event in area's such as NGO activities, child education, social awareness, people development etc.

# Installtion
```sh
$ git clone https://github.com/govindasmahajan/volStoryAPI.git
$ npm install
$ PORT={number} nodemon
$ http://localhost:{port}}/allEvents
$ http://localhost:{port}}/createEvent
```
# New Features!
    - /getAllEvents
    - /createEvent
# Collect Data
    - eventSample.json
> This file is being used to collect & fine-tune all the fields required for EVENT type API's to have a modular design.

# /createEvent

> This end point is used to create new event's in the system here is sample request :
```sh
 {
            "name": "event-name-1",
            "title": "plantation-in-pune-1",
            "category": "Nature",
            "locationCity": "Pune",
            "locationArea": "Katraj",
            "locationZip": "411046",
            "description": "An event to plant trees in nearby area for saving the nature",
            "Tags": [
            "#nature",
            "#plants"
            ],
            "Duration": {
            "From": "2019-02-15T11:00:00.000Z",
            "To": "2018-02-15T14:30:00.000Z"
            },
            "LastDateOfJoining": "2018-02-10T14:30:00.000Z",
            "Volunteers": {
            "Min": 10,
            "Max": 20
            },
            "RequiredSkills": [
            "Gardeining",
            "Communication",
            "Planning"
            ],
            "Facilities": [
            "Water",
            "Snacks"
            ],
            "Visibility": "Public",
            "CreatedBy": {
            "Name": "Govinda M"
            },
            "Comments": [
            {
            "Name": "Govinda",
            "Commnet": "Comment#1"
            },
            {
            "Name": "Govinda",
            "Commnet": "Comment#2"
            }
            ],
            "Interest": {
            "PeopleJoined": [
            "user_1_id",
            "user_2_id"
            ],
            "PeopleInterested": [
            "user_3_id",
            "user_4_id"
            ]
            }
            }
```

