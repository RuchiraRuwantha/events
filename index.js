const Airtable = require('airtable')

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async (req, res) => {
  const apiKey = process.env.AIRTABLE_API_KEY
  const base = new Airtable({ apiKey }).base(process.env.AIRTABLE_BASE_ID)

  const baseNames = [
    { table: 'Speakers', view: 'Speaker List' },
    { table: 'Locations', view: 'Location List' },
    { table: 'Schedule', view: 'Public Event List' },
  ]

  const [speakersRes, locationsRes, schedulesRes] = await Promise.all(
    baseNames.map(({ table, view }) =>
      base(table)
        .select({ view })
        .all()
    )
  )

  const speakers = speakersRes.reduce((acc, { id, fields }) => {
    delete fields.Schedule
    return { ...acc, [id]: fields }
  }, {})

  const locations = locationsRes.reduce((acc, { id, fields }) => {
    delete fields.Events
    delete fields['Max Capacity']
    return { ...acc, [id]: fields }
  }, {})

  const schedules = schedulesRes.reduce((acc, { id, fields }) => {
    const {
      Description = null,
      Images,
      Location,
      Name,
      Public,
      RSVP,
      Speakers,
      Start,
      Status,
    } = fields

    if (Public) {
      return [
        ...acc,
        {
          Name,
          Start,
          Location: locations[Location[0]],
          Speakers: Speakers.map(s => speakers[s]),
          RSVP,
          Status,
          Description,
          Images,
        },
      ]
    }
  }, [])

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(schedules, null, 2))
}
