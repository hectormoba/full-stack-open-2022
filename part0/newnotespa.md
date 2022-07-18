## Diagram for a user creates a new note in a Single Page Application (SPA)

```mermaid
sequenceDiagram

note over browser: the user writes <br/>something into the text field<br/>and clicks the submit button<br/>The form has no action or method attributes to<br/>define how and where to send the input data

browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
browser-->>server: {"content":"test","date":"2022-07-18T19:12:38.202Z"}
server-->>browser: Response Status: 201 (body: "note created")

note over browser: the browser stays on the <br/>same page
<br/>and it sends no further HTTP requests

```
