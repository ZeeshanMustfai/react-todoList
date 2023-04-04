import { OneToDo } from "@components/Todo"

export const toDoFilter = (action: string, list: OneToDo[]) => {
	if (action === 'all') return list
  
	const result = list.filter((item) => {
		if (action === 'completed') {
			return item.completed
		} else {
			return !item.completed
		}
	})
	return result
}