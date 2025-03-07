import React, { useState } from 'react';
import '../Table.css'; // Optional: for custom styling

 const initialData = [
   { id: '1', type: 'product', value: 'platinum', modelType: 'dining::13f93363-cdd9-45f2', edit: true },
   { id: '2', type: 'user', value: 'HIGH_SPENDERS', modelType: 'dining::13f93363-cdd9-45f2', edit: true },
 ];

 const TableComponent = () => {
   const [data, setData] = useState(initialData);
   const [draggingIndex, setDraggingIndex] = useState(null);

   // Handle drag start
   const handleDragStart = (e, index) => {
     console.log('Drag started at index:', index);
     setDraggingIndex(index);
     e.dataTransfer.setData('text/plain', index.toString());
     e.dataTransfer.effectAllowed = 'move';
   };

   // Handle drag over
   const handleDragOver = (e, index) => {
     e.preventDefault(); // Necessary to allow dropping
     e.dataTransfer.dropEffect = 'move';
     console.log('Dragging over index:', index);
   };

   // Handle drag enter (optional, for visual feedback)
   const handleDragEnter = (e, index) => {
     e.preventDefault();
     console.log('Drag entered index:', index);
   };

   // Handle drop
   const handleDrop = (e, dropIndex) => {
     e.preventDefault();
     const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
     console.log('Dropped at index:', dropIndex, 'from index:', draggedIndex);

     if (draggedIndex === dropIndex) {
       console.log('Same index, no reordering needed');
       return;
     }

     const newData = [...data];
     const [draggedItem] = newData.splice(draggedIndex, 1);
     newData.splice(dropIndex, 0, draggedItem);

     setData(newData);
     setDraggingIndex(null);
   };

   // Handle drag end
   const handleDragEnd = () => {
     console.log('Drag ended');
     setDraggingIndex(null);
   };

   return (
     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
       <thead>
         <tr>
           <th>Order</th>
           <th>Type</th>
           <th>Value</th>
           <th>Model Type</th>
           <th>Edit</th>
         </tr>
       </thead>
       <tbody>
         {data.map((row, index) => (
           <tr
             key={row.id}
             draggable
             onDragStart={(e) => handleDragStart(e, index)}
             onDragOver={(e) => handleDragOver(e, index)}
             onDragEnter={(e) => handleDragEnter(e, index)}
             onDrop={(e) => handleDrop(e, index)}
             onDragEnd={handleDragEnd}
             style={{
               background: draggingIndex === index ? '#e0e0e0' : index % 2 === 0 ? '#f9f9f9' : 'white',
               cursor: 'move',
             }}
           >
             <td>
               <span role="img" aria-label="drag-handle">
                 ≡≡
               </span>{' '}
               {index + 1}
             </td>
             <td>{row.type}</td>
             <td>{row.value}</td>
             <td>{row.modelType}</td>
             <td>
               <a href="#" onClick={(e) => e.preventDefault()}>
                 <img
                   src="https://your-pencil-icon-link-here.png" // Replace with your pencil icon link
                   alt="Edit"
                   style={{ width: '16px', height: '16px' }}
                 />
               </a>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   );
 };

export default TableComponent;
