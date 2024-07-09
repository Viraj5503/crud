import React, { useState } from "react";

function Todo() {
  const [state, setState] = useState("");
  const [tableData, setTableData] = useState([]);
  const [uState, setuState] = useState({
    isUpdate: false,
    index: null,
  });

  const handleOnChange = (event) => {
    setState(event.target.value);
  };

  const addtask = (index) => {
    if (uState.isUpdate) {
      if (state.trim()) {
        const updatedTable = [...tableData];
        updatedTable.splice(uState.index, 1, state);
        setTableData(updatedTable);
        setState("");
        setuState({
          isUpdate: false,
          index: null,
        });
      }
    } else if (state.trim()) {
      setTableData([...tableData, state]);
      setState("");
    }
  };

  const deleteTask = (index) => {
    setTableData(tableData.filter((row, i) => i !== index));
  };

  const updateTask = (index, row) => {
    //console.log(index)
    setuState({
      isUpdate: true,
      index: index,
    });
    //setState(tableData.filter((row, i)=>i === index));
    setState(row);
    console.log(row);
  };

  // const select = (index) =>{
  //     setuState(true);
  // }

  // const submitTask =  (index) => {
  //     if (state.trim()){
  //         const updatedTable=[...tableData];
  //         updatedTable[index]=state;
  //         setTableData([state]);
  //         setState('');
  //     }
  // }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-serif font-bold p-3">To-Do Table</h1>
      <div className="mb-4">
        <input
          className="shadow-md p-2 w-80 border-2 border-slate-800 rounded-l-lg focus:outline-none"
          type="text"
          value={state}
          onChange={handleOnChange}
          placeholder="Enter your task"
        ></input>
        <button
          className={`shadow-md p-2 border-2 border-slate-800 rounded-r-lg ${
            uState.isUpdate ? "bg-yellow-600" : "bg-green-600"
          } text-white hover:opacity-70`}
          type="button"
          id="add"
          onClick={() => addtask()}
        >
          {uState.isUpdate ? "Update Task" : "Add Task"}
        </button>
      </div>
      <table
        className="border-collapse border border-gray-400 w-full md:w-1/2"
        id="taskTable"
      >
        <thead className="bg-gray-300">
          <tr>
            <th className="border border-gray-400 p-2 w-3/4">Tasks</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-400 p-2">{row}</td>
              <td className="border border-gray-400 p-2 flex justify-center space-x-2">
                <button
                  className="p-1 mr-2 border border-red-600 bg-red-600 text-white rounded hover:opacity-70"
                  type="button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className={`p-1 border border-blue-600 bg-blue-600 text-white rounded hover:opacity-70 ${
                    uState.index === index
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  type="button"
                  disabled={uState.index === index}
                  onClick={() => updateTask(index, row)}
                >
                  Update
                </button>
              </td>
              {/* <td>
                        <button type="button" onClick={() => submitTask(index)}>Submit</button>
                    </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Todo;
