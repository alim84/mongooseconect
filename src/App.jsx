import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  let [crud, setcrud] = useState("");
  let [alltask, setAllTask] = useState([""]);

  let handlecrud = async () => {
    // const response = await fetch(" http://localhost:4000/insertdata/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: crud }),
    // });
    // console.log(response);
    axios
      .post("http://localhost:4000/insertdata/", {
        name: crud,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getAllData() {
    axios
      .get("http://localhost:4000/getalldata/")
      .then((data) => {
        setAllTask(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllData();
  }, [alltask]);

  let handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/deletedata/:${id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input
                onChange={(e) => setcrud(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button
                onClick={() => handlecrud()}
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-red-400 hover:bg-teal"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {alltask.map((item) => (
              <div className="flex mb-4 items-center">
                <p className="w-full text-grey-darkest">{item.crud}</p>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-green-900 text-green border-green hover:bg-green">
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-red-500 hover:bg-red"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
