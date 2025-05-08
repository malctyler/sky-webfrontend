import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, defaultAnimateLayoutChanges, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

// dummy data
import { tasks } from "./data";

// images
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Dropdown, Row } from "react-bootstrap";
const TaskItem = ({
  id,
  task
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    animateLayoutChanges: defaultAnimateLayoutChanges
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1
  };
  return <li ref={setNodeRef} style={style} {...attributes} {...listeners} className={`task-${task.priority}`}>
            <div className="form-check mb-2 float-end">
                <input className="form-check-input ms-0" type="checkbox" value="" />
            </div>
            <h5 className="mt-0">
                <Link to="" className="text-dark">
                    {task.title}
                </Link>
            </h5>

            <p>{task.description}</p>

            <div className="clearfix"></div>

            <Row>
                <Col xs={'auto'}>
                    <div>
                        {(task.userAvatar || []).map((avatar, index) => {
            return <Link key={index} to="" className="me-1">
                                    <img src={avatar} alt="avatar" className="avatar-sm img-thumbnail rounded-circle" height={36} width={36} />
                                </Link>;
          })}
                    </div>
                </Col>
                <Col>
                    <div className="text-end">
                        <p className="font-13 mt-2 mb-0">
                            <i className="mdi mdi-calendar"></i> {task.dueDate}
                        </p>
                    </div>
                </Col>
            </Row>
        </li>;
};
const TaskList = ({
  list,
  title
}) => {
  return <SortableContext items={list.map(i => i.id.toString())} strategy={verticalListSortingStrategy}>
            <Col lg={4}>
                <Card>
                    <CardBody>
                        <Dropdown className="float-end" align="end">
                            <Dropdown.Toggle as="a" className="cursor-pointer">
                                <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                                <Dropdown.Item>Add Members</Dropdown.Item>
                                <Dropdown.Item>Add Due Date</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <h5 className="header-title">{title}</h5>
                        <p className="sub-header">
                            Your awesome text goes here. Your awesome text goes here.
                        </p>

                        <ul className="sortable-list tasklist list-unstyled">
                            {list.map(item => <TaskItem task={item} id={item.id.toString()} key={item.id} />)}
                        </ul>
                        <div className="d-grid">
                            <Button variant="primary" className="mt-3 waves-effect waves-light">
                                <i className="mdi mdi-plus-circle"></i> Add New
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </SortableContext>;
};
const KanbanBoard = () => {
  const [upcomingTasks, setUpcomingTasks] = useState(tasks.filter(t => t.status === "upcoming"));
  const [inProgressTasks, setInProgressTasks] = useState(tasks.filter(t => t.status === "in-progress"));
  const [completedTasks, setCompletedTasks] = useState(tasks.filter(t => t.status === "completed"));
  const sensors = useSensors(useSensor(PointerSensor));
  const allLists = {
    'upcoming': upcomingTasks,
    'in-progress': inProgressTasks,
    'completed': completedTasks
  };
  const setListByKey = {
    'upcoming': setUpcomingTasks,
    'in-progress': setInProgressTasks,
    'completed': setCompletedTasks
  };
  const findContainer = id => {
    if (upcomingTasks.some(t => t.id.toString() === id)) return 'upcoming';
    if (inProgressTasks.some(t => t.id.toString() === id)) return 'in-progress';
    if (completedTasks.some(t => t.id.toString() === id)) return 'completed';
    return null;
  };
  const handleDragEnd = ({
    active,
    over
  }) => {
    if (!over) return;
    const activeList = findContainer(active.id);
    const overList = findContainer(over.id);
    if (!activeList || !overList) return;
    if (activeList === overList) {
      const list = allLists[activeList];
      const oldIndex = list.findIndex(t => t.id.toString() === active.id);
      const newIndex = list.findIndex(t => t.id.toString() === over.id);
      const updated = arrayMove(list, oldIndex, newIndex);
      setListByKey[activeList](updated);
    } else {
      const sourceList = allLists[activeList].filter(t => t.id.toString() !== active.id);
      const draggedItem = allLists[activeList].find(t => t.id.toString() === active.id);
      const targetList = [...allLists[overList]];
      const overIndex = targetList.findIndex(t => t.id.toString() === over.id);
      targetList.splice(overIndex, 0, draggedItem);
      setListByKey[activeList](sourceList);
      setListByKey[overList](targetList);
    }
  };
  return <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

                <Row>
                    <TaskList title="Upcoming" list={upcomingTasks} />
                    <TaskList title="In Progress" list={inProgressTasks} />
                    <TaskList title="Completed" list={completedTasks} />
                </Row>
            </DndContext>

        </>;
};
export default KanbanBoard;