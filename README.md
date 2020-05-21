# Media

$ git branch | grep -v "master" | xargs git branch -D

git push origin :old-name new-name

# CRUD Support from API
 Method | API Endpoint | Description |
--------|--------------|-------------|
**GET** | /media | Gets record from database |
**POST** | /media | Creates one new record in database |
**PUT** | /media | Updates record in database |
**DELETE** | /media | Deletes record from database |