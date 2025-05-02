@echo off
start cmd /k "cd /d backend && nodemon server"
start cmd /k "cd /d frontend && npm start"