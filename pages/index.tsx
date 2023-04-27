import { directusClient } from '@src/apollo-client'
import {
  EventsDocument,
  type EventsQuery,
  type EventsQueryVariables,
} from '@src/generated/graphqlDirectus'

export default function Index({ events, ...props }) {
  return (
    <div>
      <div className="flex flex-col gap-x-medium gap-y-xlarge ">
        <h1 className="hero1 mb-medium w-full md:w-3/4">Events</h1>
        <p className="text-marketing-white">This is some paragraph textzz</p>
        <div className="flex flex-col">
          {events.map((event) => (
            <div className="rounded-md bg-fill-one p-medium">
              {event.name}, {Date(event.start_date)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data, error } = await directusClient.query<
    EventsQuery,
    EventsQueryVariables
  >({
    query: EventsDocument,
  })

  if (error) {
    throw new Error(`${error.name}: ${error.message}`)
  }

  return { props: { events: data.events || [] } }
}
