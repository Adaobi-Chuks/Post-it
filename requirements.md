# REQUIREMENTS
The following are some important requirements you should take note about the API.

- Soft Delete: All resources implemented soft delete, therefore instead of a resource to be deleted when the user makes a delete request, the “isDeleted” field is changed to “true”. In order to make this airtight, all methods/functions that needs to return a resource only returns ones that has an “isDeleted” value of “false”. This was implemented in my [`user.service.ts`](/src/services/user.service.ts) file.

- The generateRandomAvatarURL function which can be found in the [`randomAvatarURL.util.ts`](/src/utils/randomAvatarURL.util.ts) file which was stored in my [`utils`](/src/utils/randomAvatarURL.util.ts) folder where I contains files that has reusable functions or methods which can be used across multiple endpoints in the API, improving code modularity and reducing repetition. It is then called in my [`user.model.ts`](/src/models/user.model.ts) when it is used to generate a unique avatar URL for the user’s profile.
Note: avatar URL updates when changes are made to the user’s resource which was also done in my [`user.model.ts`](/src/models/user.model.ts) file.

- Am img tag was generated to help the frontend developers which contains a link to the user’s unique avatar image and an alternative text generated with the help of the user’s username.
Note: the image tag updates when changes are made to the user’s resource which was also done in my [`user.model.ts`](/src/models/user.model.ts).

- When returning a user’s details to the user, the password field was excluded in order to not make the user’s personal details vulnerable to by public. This was implemented in my [`users.service.ts`](/src/services/user.service.ts) file. 

- No user is allowed to delete resources belonging to another user, therefore each create, update and delete requests were properly validated. This was done by comparing the Id of the user logged in and that of user that created the request which can be gotten from the userId property assigned to the resource during the time of creation. This was implemented in the [`authentication.middleware.ts`](/src/middlewares/auth/authentication.middleware.ts) file and in the [`users.controller.ts`](/src/controllers/user.controller.ts) file.

- In packaging my folder I made use of layered structuring because there were lots of components that needed to be implemented so by dividing the code into layers based on functionality helped make the system easier to understand and maintain.

- PATCH was used instead of PUT because it involve updating only certain fields depending on what the user inputs, and the resource is not being fully replaced. But for the rest PUT was more appropriate since only one field is needed from the user to create the resource.