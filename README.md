# Smart iFrame (Zendesk App)

Easily embed a 3rd party application or website into your Zendesk agent workspace just by specifying the URL.

You can leverage data about the Zendesk ticket, assigned user, current user, and requester to formulate dynamic URLs

Available template strings:

- {ticket_id}
- {current_user_id}
- {current_user_email}
- {requester_id}
- {requester_email}
- {assignee_id}
- {assignee_email}

For example, setting up the app with URL `https://mysite.com/profile/{requester_email}` will result in an embedded iFrame to URL `https://mysite.com/profile/1234`

This application was created by Hubbub Studios.

### Screenshot(s):

![Smart iFrame screenshot](/app/assets/listing/app.png)
