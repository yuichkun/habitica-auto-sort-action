import { retrieveTasks, sortTasks} from './habitica.ts'
if (import.meta.main) {
  console.log('app started')
  console.log('retrieving tasks')
  const tasks = await retrieveTasks()
  console.log(`retrieved ${tasks.length} tasks`)
  sortTasks(tasks)
  console.log('done')
}
