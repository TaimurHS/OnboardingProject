Notes for future:

1) On the frontend, "Add Student" will populate all fields and send it to the server for processing. These fields will include "Courses", which could either initially be empty, or have courses too ("Courses" is a list of course names...these courses are already registered in the DB beforehand).

2) On the frontend, "Edit Student" flow will be like this:
  - Get all the details from the backend and display them in text-boxes ('name' textbox should not be editable)
  - Send all the details back to the backend when a 'Save' (or similar) button is clicked. This will also send the courses, whether they were changed or not (since all the details are sent). At the backend, the entries in the joint table 'Student_course' (corresponding to the name of the student whose data is being edited) will be deleted, and new entries will be made in this table for this particular student, with the courses now updated.


! Create course done. Implemented on frontend and integrated with backend...DB updated successfully!
