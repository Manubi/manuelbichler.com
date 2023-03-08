const people = [
  { id: 1, name: 'Annette Black' },
  { id: 2, name: 'Cody Fisher' },
  { id: 3, name: 'Courtney Henry' },
  { id: 4, name: 'Kathryn Murphy' },
  { id: 5, name: 'Theresa Webb' },
]
// manuel todo // loock for the other checkboxes and refactor them
export function Checkboxes({
  title,
  checkboxes,
}: {
  title: string
  checkboxes: { name: string }[]
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold leading-6 text-gray-900">
        {title}
      </legend>
      <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
        {checkboxes.map((box, boxIdx) => (
          <div key={boxIdx} className="relative flex items-start py-4">
            <div className="flex-1 min-w-0 text-sm">
              <label
                htmlFor={`person-${box.name}`}
                className="font-medium text-gray-700 select-none"
              >
                {box.name}
              </label>
            </div>
            <div className="flex items-center h-5 ml-3">
              <input
                id={`person-${box.name}`}
                name={`person-${box.name}`}
                type="checkbox"
                className=" my-4 w-full min-w-0  flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 outline-none placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                //className="w-4 h-4 text-teal-600 bg-white border-gray-300 rounded focus:border-teal-500 dark:text-zinc-200"
              />
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
