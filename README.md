| Field | Value |
|---|---|
| Repository URL | [GitHub Repository](https://github.com/DarciHan/cse134b-hw5) |
| Deployed Website URL | To be added |

## CSE 134B - Homework 5

### Cat Facts

I added a Cat Facts component to my home page.
Users can click a button to learn facts about cats.

### Design Note

When the button is clicked, fetch() gets a new cat fact
from the API. The fact is checked and displayed using
textContent without refreshing the page.

While waiting, it shows Loading...
If it works, it shows a new cat fact and Fact loaded.
If it fails, it shows an error message and the user
can try again.

I also added a toggle view button and used localStorage
to remember the visitor's choice upon page refreshes.

### SSG Exercise

Folder: ssg-exercise/

Pages: Education and Interests

I used Eleventy to make both pages share the same footer.
Changing the footer in one file updates both pages.

The instructions are in ssg-exercise/README.md.