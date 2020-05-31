# TaskMaster_Collate

## Deployed Link

[**Here lies the application**](https://task-master-collate.herokuapp.com/tasks)

---

### Description:

This is an application that was built as the selection task for [_Collate_](https://collate.co.in/). It is an application that tracks your progress for the corresponding tasks that you have created in it. The

---

### **2. /api/notes/getAll => GET Route**

**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
   "data": [
	   {
	      "id":<Note ID>,
	      "author":"<Username>",
	      "title":"<Title of the Note>",
	      "content":"<Content of the Note>",
	      "create_time":"<Note Create Time in httpDate Format>",
	      "edited":<Edit Status: 0 for unedited Note, 1 for edited Note>,
	      "update_time":"<Note Edit Time in httpDate Format>"
           },
	   <Other Notes also>
   ]
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|404|No Notes Found.|User has no Notes.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

### **3. /api/notes/get?id=[Note ID] => GET Route**

**_Query Parameters:_**
|Query Parameter|Description|
|--|--|
|**id**|The specific Note ID|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
   "data": {
	      "id":<Note ID>,
	      "author":"<Username>",
	      "title":"<Title of the Note>",
	      "content":"<Content of the Note>",
	      "create_time":"<Note Create Time in httpDate Format>",
	      "edited":<Edit Status: 0 for unedited Note, 1 for edited Note>,
	      "update_time":"<Note Edit Time in httpDate Format>"
           }
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|404|No Notes Found.|Note with the specified ID not found.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

### **4. /api/notes/update => POST Route**

**_Parameters:_**
|Parameter Name|Required|Type|
|--|--|--|
|**id**|Yes|String|
|**title**|Yes|String|
|**content**|Yes|String|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|400|Bad Request. Invalid Parameters.|Either the _id_, _title_ or _content_ fields are empty|
|404|No Notes Found.|User does not have a note with that ID.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

### **5. /api/notes/delete => POST Route**

**_Parameters:_**
|Parameter Name|Required|Type|
|--|--|--|
|**id**|Yes|String|
**_Response JSON:_**

```
{
   "status": "OK" or "ERROR",
   "error": <Error Message if any>
}
```

**_Status Codes and Errors:_**
|Status Codes|Error Message|Reason|
|--|--|--|
|200|-|No Error.|
|400|Note ID Missing.|The _id_ field is empty|
|404|No Notes Found.|User does not have a note with that ID.|
|500|Internal Server Error.|Some server-side error has occurred.|

---

## Technology Stack Used:

- Amazon RDS MySQL
- Heroku
- Express
- Node

# Project Contributors:

- [**Gita Alekhya Paul**](https://github.com/gitaalekhyapaul)  
  **If you like what you have seen, kindly star the repository!**
