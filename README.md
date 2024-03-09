# Smart iFrame (Zendesk App)

Easily embed a 3rd party application or website into your Zendesk agent workspace just by specifying the URL.

You can leverage data about the Zendesk ticket, assigned user, current user, and requester to formulate dynamic URLs

Available template strings:

- `{ticket_id}`
- `{current_user_id}`
- `{current_user_email}`
- `{requester_id}`
- `{requester_email}`
- `{assignee_id}`
- `{assignee_email}`

For example, setting up the app with URL `https://mysite.com/profile/{requester_id}` will result in an embedded iFrame to URL `https://mysite.com/profile/1234` where `1234` is the Zendesk user ID of the ticket requester (aka customer)

This application was created by Hubbub Studios.

### Screenshot(s):

![screenshot](https://raw.githubusercontent.com/hubbubdev/zendesk-easy-iframe/main/assets/listing/app.png)
