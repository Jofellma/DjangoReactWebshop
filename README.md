# **NICE SHOP AB**
Jonas Fellman (jofellma@abo.fi)

## Requirements
Requirements not implemented:
Functional requirements: 4, 12, 13, 14
Non-functional requirements: 15, 17 (I think?)

BUG:
When paying for the basket, page needs to be re-rendered for the item to disapear from the page

## Installation guide
clone repository and navigate to root folder:
```
cd web-shop-project-2022-Jofellma
```
Create an virtual environment
```
python -m venv .venv
```
Activate environment
```
.venv\Scripts\activate.bat
```
Install libraries and packages
```
pip install -r requirements.txt
```
Migrate
```
python djangoBackend/manage.py migrate
```
Build frontend
```
cd react-frontend/
```
```
npm install
or
npm install --legacy-peer-deps
```
```
npm run build
```
Start server
```
python ../djangoBackend/manage.py runserver
```