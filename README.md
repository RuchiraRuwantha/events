<!-- markdownlint-disable MD014 -->

# SurabayaJS Events API

Event API server powered by [Airtable](https://airtable.com/) and [ZEIT Now](https://zeit.co/now)

## Usage

Just fetch from <https://events.surabayajs.org> and it will return a JSON data

```json
[
  {
    "Name": "JavaScript at Scale: Things to Do and Things to Avoid",
    "Start": "2019-04-18T11:00:00.000Z",
    "Location": {
      ...
    },
    "Speakers": [
      {
        "Role": "Frontend Developer",
        "Company": "Bukalapak",
        "Name": "Royyan Bachtiar"
      }
    ],
    "RSVP": "https://surabayajs-1.eventbrite.com/",
    "Status": "Finished",
    "Description": "...",
    "Images": [
      ...
    ]
  }
]
```

## Create your own events

- Use this base template and add it to your workspace (<https://airtable.com/shrO7FGCNVydcUUEr>)

- Generate an API key from the Account page (<https://airtable.com/account>)
  - Note: it is recommended to create a separate account only for the current workspace, since the API key can access all bases available on the account

- Clone this project and install dependencies

  ```console
  $ git clone https://github.com/SurabayaJS/events.git
  $ yarn
  ```

- Modify the deployment alias and other settings on [`now.json`](https://github.com/SurabayaJS/events/blob/master/now.json)

- Add your API key (`AIRTABLE_API_KEY`) and created base ID (`AIRTABLE_BASE_ID`) to ZEIT Now secrets

  ```console
  $ now secrets add AIRTABLE_API_KEY <key value>
  $ now secrets add AIRTABLE_BASE_ID <base id value>
  ```

- Install ZEIT Now CLI and login to your account

  ```console
  $ yarn global add now
  $ now login
  ```

- Deploy the cloned project by running `now`

  ```console
  $ cd cloned-events-project
  $ now
  ```

## License

MIT
