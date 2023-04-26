import { container } from './index.css'

export default function Index() {
  return (
    <div className={`flex flex-wrap text-text ${container}`}>
      <h1 className="mt-0 w-full md:w-3/4">Hello world!</h1>
      <h1 className="mb-0 w-full md:w-1/4">Hello world!</h1>
      <p>This is some paragraph textzz</p>
    </div>
  )
}
