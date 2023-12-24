import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  let [currentPageData, setCurrentPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const lastPage = Math.ceil(data.length / entriesPerPage);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );

      const data = await response.json();
      setData(data);
      setCurrentPageData(data.slice(currentPage - 1, entriesPerPage));
    } catch (error) {
      alert("failed to fetch data");
    }
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
