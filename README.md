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
19. [ ] link class signups to calendar
20. [x] receipts page back button
21. [ ] how to view tab menu when on a non-tab page?
22. [x] register needs to be for a specific date, not just weekday class
    1. [ ] fix bug on page refresh -need to?
23. [ ] profile page have to refresh to see changes to user membership why?
24. [ ] new user registration implement validators and disable/enable submit button
