export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


export const taskTitleLetterLimit=(string)=>{
  return string
}



export const truncateTaskName = (taskName, maxLength = 20) => {
  if (taskName.length > maxLength) {
    return taskName.substring(0, maxLength) + '..';
  }
  return taskName;
};