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

![screenshot](https://raw.githubusercontent.com/hubbubdev/zendesk-easy-iframe/main/assets/listing/app.png)

### iFrame Not Working?

Not all websites can be rendered within an iFrame. If you see this:

![screenshot](https://raw.githubusercontent.com/hubbubdev/zendesk-easy-iframe/main/assets/listing/app_blocked.png)

The application may be blocking this behavior. This is a decision made by the respective website owner / administrator.

Opening the browser developer tools console should present some additional information, such as:

```
Refused to display 'https://thewebsiteyouwanttoiframe.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.
```

If you are attempting to configure Smart iFrame with a 3rd party vendor application, you can reach out to their support department and discuss further.

If you or your company owns the website you are trying to iFrame, you may need to speak with your system administrator about disabling restrictive controls that are set via the HTTP header `X-Frame-Options`

If `X-Frame-Options` is set to `DENY` or `SAMEORIGIN` (and it doesn't match the criteria), the browser will block the framing.
