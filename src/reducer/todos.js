import * as types from '../actions/ActionTypes';

const initialTasks = [
  { taskName: "task1", isCompleted: false },
  { taskName: "task2", isCompleted: false },
  { taskName: "task3", isCompleted: false },
]

export default function Todos(state = initialTasks /*目前狀態物件*/, action/*接收到的行動物件*/) {
  // console.log(" initialTasks  state,", state)

  switch (action.type) {

    case types.ADD_TASK://根據行動的 TYPE  
      return [ //來決定回傳什麼
        ...state,
        {
          taskName: action.taskName,
          isCompleted: false,
        },
      ];

    case types.EDIT_TASK:
      let newtaskName = [...state];
      newtaskName[action.id].taskName = action.taskName;
      return newtaskName

    case types.DELETE_TASK:
      return (
        [...state.slice(0, action.id), ...state.slice(action.id + 1)]
      )

    case types.TOGGLE_TASK:
      return state;

    default: //一定要回傳的
      return state;
  }
}

