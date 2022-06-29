1. [x] create class item component which will be shown in a list on tab 1
2. [x] create a date filter
3. [x] class type filter
4. [x] show name of class type, not the ID -> in class component, write function to return classType.name that corresponds to the classTypeId
5. [x] change index.js get to find by pk and change route, then in the function input pk into route? but then how to get that into service?
6. [x] day filter not working properly when changeDate()
   1. [x] AuthGuard for class registration, profile viewing
   2. [x] login to complete a purchase
7. [x] create purchase tab
8. [x] receipts list page 
   1. [x] order by date newest to oldest
   2. [x] make sure only user's purchases are visible and not all (filter in index.js)
9. [ ] settings page
   1. [x] edit profile 
   2. [ ] change password -- doesn't work
   3. [x] calendar settings (calendar plugin)
   4. [ ] notification settings (notification plugin)
   5. [ ] privacy settings (name visible to others when signed up for a class)
10. [x] order class schedule by start time
11. [ ] profile add photo
12. [x] change membership type after a purchase
13. [x] change membership after class signup
14. [x] unlimited and open gym memberships expiry after 30 days
15. [x] register user for class
    1. [x] fix html registration button to have classDetails.classId and userId as inputs
16. [x] make registration button inactive if current time > class start time class detail view is authguarded
17. [x] sequelize eager loading error when trying to view name of user associated with a class reg
18. [x] change waiver signed to 1 after a waiver is signed
    - what initiates a waiver signed? prob when creating a new account
19. [x] link class signups to calendar - function complete, but calendar not detected
20. [x] receipts page back button
21. [x] register needs to be for a specific date, not just weekday class
    1. [ ] fix bug on page refresh -need to?
22. [x] profile page have to refresh to see changes to user membership why?
23. [ ] new user registration implement validators and disable/enable submit button
24. [x] mock payment form
    1. [x] style mock payment form
25. [x] style for prefers dark mode
26. [x] register for class only if space avail
27. [x] cancel class registration
28. [x] fix timezone issue (off by one day)
29. [ ] admin features
    1. [x] edit class details (time, description, type, max limit)
    2. [x] add and delete classes
    3. [ ] cancel single instance of a class
    4. [x] change price of purchases
 PROBLEMS
[x] cancel registration button show an alert
[x] admin edit class details doesn't show on tab 1 unless refresh tab
[ ] clicked tabs turn red with icon not visible
[x] profile edit not showing on tab 3 after changes saved
[x] successful registration goes back (to waiver if waiver looked at); nav forward to a route
[x] membership type and passes avail don't update with purchase/registration on profile page
[x] admin add class button
[x] cannot have duplicate class registrations for user/class/date
[ ] shadow effects
[x] splash screen
[x] change add to calendar ui buttons to something cooler

export ANDROID_SDK_ROOT=$HOME/Android/Sdk
