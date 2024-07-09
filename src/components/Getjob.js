import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Getjob = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const jobsPerPage = 6;

  const fetchJobData = async (page) => {
    try {
      setLoading(true);

      
      const jobIDsResponse = await axios.get('https://hacker-news.firebaseio.com/v0/jobstories.json');
      const jobIDs = jobIDsResponse.data; 

      
      const startIndex = page * jobsPerPage;
      const endIndex = startIndex + jobsPerPage;
      const currentJobIDs = jobIDs.slice(startIndex, endIndex);

      
      const jobDetailsPromises = currentJobIDs.map(id =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );
      const jobDetailsResponses = await Promise.all(jobDetailsPromises);
      const newJobs = jobDetailsResponses.map(response => response.data);

      newJobs.sort((a, b) => new Date(b.time) - new Date(a.time));

      setJobDetails(prevJobs => [...prevJobs, ...newJobs]);
      setHasMore(endIndex < jobIDs.length);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Job List</h1>
      <ul>
        {jobDetails.map(job => (
          <>
          <a href={job.url} style={{textDecoration:'none'}}>
          <li key={job.id} style={{border:'1px solid black'}}>
            <h4>{job.title}</h4>
            <p> Posted By  : {job.by} |  {new Date(job.time).toLocaleString()}</p>
            
          </li>
          </a>
          
          </>
          
        ))}
      </ul>
      {loading && <div>Loading...</div>}
      {!loading && hasMore && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default Getjob;
