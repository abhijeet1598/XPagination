import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  let [currentPageData, setCurrentPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const lastPage = Math.ceil(data.length / entriesPerPage);

  const fetchData = () => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        setData(res.data);
        setCurrentPageData(res.data.slice(currentPage - 1, entriesPerPage));
      })
      .catch((error) => {
        console.error(error);
        alert("failed to fetch data");
      });
  };

  const getCurrentPageData = () => {
    let start = (currentPage - 1) * entriesPerPage,
      end = start + entriesPerPage;
    currentPageData = data.slice(start, end);
    setCurrentPageData(currentPageData);
  };

  const getNextPage = () => {
    if (currentPage < lastPage) setCurrentPage((prevState) => prevState + 1);
  };

  const getPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevState) => prevState - 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getCurrentPageData();
  }, [currentPage]);

  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            currentPageData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="btns">
        <button onClick={getPrevPage}>Previous</button>
        <button>{currentPage}</button>
        <button onClick={getNextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
