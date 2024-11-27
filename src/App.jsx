import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  let [crud, setcrud] = useState("");
  let [alltask, setAllTask] = useState([]);
  let [update, setUpdate] = useState(false);
  let [updatetask, setUpdatetask] = useState("");
  let [id, setId] = useState("");

  let handlecrud = async () => {
    axios
      .post("http://localhost:4000/insertdata/", {
        name: crud,
        nume: "",
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
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllData();
  }, []);

  let handleDelete = (id) => {
    console.log(name);
    axios
      .delete(`http://localhost:4000/deletedata/${id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handeEditmodal = (id) => {
    setUpdate(true);
    setId(id);
  };

  let handleupdateTask = (e) => {
    setUpdatetask(e.target.value);
  };

  let handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:4000/updatedata/${id}`, {
        name: updatetask,
      });
      setUpdate(false);
      getAllData();
    } catch (error) {
      console.error(error);
    }
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
            {alltask.data &&
              alltask.data.map((item) => (
                <div className="flex mb-4 items-center" key={item._id}>
                  <p className="w-full text-grey-darkest">{item.name}</p>

                  <button
                    onClick={() => handeEditmodal(item._id)}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-green-900 text-green border-green hover:bg-green"
                  >
                    Edit
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

      {update && (
        <div className="h-[600px] w-[600px] absolute top-0 left-2/4 translate-x-[-50%] mx-auto flex items-center justify-center bg-red-400 font-sans shadow-lg">
          <button
            onClick={() => setUpdate(!update)}
            className="px-2 py-1 bg-red-500 absolute top-2 right-2 rounded-md"
          >
            X
          </button>
          <div className="flex mt-4">
            <input
              onChange={handleupdateTask}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Update Your list"
              value={alltask.name}
            />
            <button
              onClick={handleUpdate}
              className="flex-no-shrink p-2 font-bold px-3 border-2 rounded text-teal border-teal bg-teal-300 hover:text-red-800 hover:bg-teal-800"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
