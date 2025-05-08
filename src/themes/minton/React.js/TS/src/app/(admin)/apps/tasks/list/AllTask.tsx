
import { useState } from "react";
import TaskSection from "./Section"

//data
import { TaskItemTypes, otherTasks, todayTasks, upcomingTasks } from "./data";

const AllTask = () => {
  const [todayTask] = useState<TaskItemTypes[]>([...todayTasks]);
  const [upcomingTask] = useState<TaskItemTypes[]>([...upcomingTasks]);
  const [otherTask] = useState<TaskItemTypes[]>([...otherTasks]);
  return (
    <div className="custom-accordion">
      <div className="mt-4">
        <TaskSection title="Today" tasks={todayTask} />
      </div>

      <div className="mt-4">
        <TaskSection
          title="Upcoming"
          tasks={upcomingTask}
        ></TaskSection>
      </div>

      <div className="mt-4">
        <TaskSection title="Other" tasks={otherTask} />
      </div>
    </div>
  )
}

export default AllTask