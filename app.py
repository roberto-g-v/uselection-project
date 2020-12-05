import sqlalchemy
import sqlite3
import numpy as np
import datetime as dt
import pandas as pd

from flask import Flask, render_template, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

####

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('US_Elections_Statistics.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

def get_db_connectionTot():
    conn = sqlite3.connect('US_Elections_StatisticsTot.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM US_Elections').fetchall()
    conn.close()
    return render_template('index.html', posts=posts)    


@app.route('/scatter.html')
def scatter():

    return render_template('scatter.html')

@app.route('/linear.html')
def linear():

    return render_template('linear.html')

@app.route('/geomap.html')
def geomap():

    return render_template('geomap.html')

@app.route('/piechart.html')
def piechart():

    return render_template('piechart.html')


@app.route('/api/votes')
def votes():

    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM US_Elections').fetchall()
    conn.close()

    votes = []
    for ID,county,state,total_percentage16,percentage16_Donald_Trump,percentage16_Hillary_Clinton, total_votes16 , votes16_Donald_Trump , votes16_Hillary_Clinton , total_percentage20 ,percentage20_Donald_Trump,percentage20_Joe_Biden, total_votes20 , votes20_Donald_Trump , votes20_Joe_Biden ,lat,long,cases,deaths,percentage_deaths,TotalPop,Men,Women,Hispanic,White,Black,Native,Asian,Pacific,VotingAgeCitizen,Income,IncomePerCap,Poverty,Professional,Service,Office,Construction,Production,SelfEmployed,FamilyWork,Unemployment,Total_Mail_Ballots_Returned20,Mail_Ballots_Returned_Trump20,Mail_Ballots_Returned_Biden20 in posts:
        elections_dict = {}

        elections_dict["ID"] = ID
        elections_dict["county"] = county
        elections_dict["state"] = state
        elections_dict["total_percentage16"] = total_percentage16
        elections_dict["percentage16_Donald_Trump"] = percentage16_Donald_Trump
        elections_dict["percentage16_Hillary_Clinton"] = percentage16_Hillary_Clinton
        elections_dict["total_votes16"] =  total_votes16 
        elections_dict["votes16_Donald_Trump"] =  votes16_Donald_Trump 
        elections_dict["votes16_Hillary_Clinton"] =  votes16_Hillary_Clinton 
        elections_dict["total_percentage20"] =  total_percentage20 
        elections_dict["percentage20_Donald_Trump"] = percentage20_Donald_Trump
        elections_dict["percentage20_Joe_Biden"] = percentage20_Joe_Biden
        elections_dict["total_votes20"] =  total_votes20 
        elections_dict["votes20_Donald_Trump"] =  votes20_Donald_Trump 
        elections_dict["votes20_Joe_Biden"] =  votes20_Joe_Biden 
        elections_dict["lat"] = lat
        elections_dict["long"] = long
        elections_dict["cases"] = cases
        elections_dict["deaths"] = deaths
        elections_dict["percentage_deaths"] = percentage_deaths
        elections_dict["TotalPop"] = TotalPop
        elections_dict["Men"] = Men
        elections_dict["Women"] = Women
        elections_dict["Hispanic"] = Hispanic
        elections_dict["White"] = White
        elections_dict["Black"] = Black
        elections_dict["Native"] = Native
        elections_dict["Asian"] = Asian
        elections_dict["Pacific"] = Pacific
        elections_dict["VotingAgeCitizen"] = VotingAgeCitizen
        elections_dict["Income"] = Income
        elections_dict["IncomePerCap"] = IncomePerCap
        elections_dict["Poverty"] = Poverty
        elections_dict["Professional"] = Professional
        elections_dict["Service"] = Service
        elections_dict["Office"] = Office
        elections_dict["Construction"] = Construction
        elections_dict["Production"] = Production
        elections_dict["SelfEmployed"] = SelfEmployed
        elections_dict["FamilyWork"] = FamilyWork
        elections_dict["Unemployment"] = Unemployment
        elections_dict["Total_Mail_Ballots_Returned20"] = Total_Mail_Ballots_Returned20
        elections_dict["Mail_Ballots_Returned_Trump20"] = Mail_Ballots_Returned_Trump20
        elections_dict["Mail_Ballots_Returned_Biden20"] = Mail_Ballots_Returned_Biden20

        votes.append(elections_dict)


    return jsonify(votes)

@app.route('/api/votesTot')
def votesTot():

    conn = get_db_connectionTot()
    posts = conn.execute('SELECT * FROM US_ElectionsTot').fetchall()
    conn.close()

    votesTot = []
    for index,county,state,percentage16_Donald_Trump,percentage16_Hillary_Clinton,total_votes16,votes16_Donald_Trump,votes16_Hillary_Clinton,percentage20_Donald_Trump,percentage20_Joe_Biden,total_votes20,votes20_Donald_Trump,votes20_Joe_Biden,cases,deaths,percentage_deaths,TotalPop,Men,Women,Hispanic,White,Black,Native,Asian,Pacific,VotingAgeCitizen,Income,IncomePerCap,Poverty,Unemployment,Total_Mail_Ballots_Returned20,Mail_Ballots_Returned_Trump20,Mail_Ballots_Returned_Biden20 in posts:

        elections_dict2 = {}

        elections_dict2["index"] = 	index
        elections_dict2["county"] = county
        elections_dict2["state"] = 	state
        elections_dict2["percentage16_Donald_Trump"] = 	percentage16_Donald_Trump
        elections_dict2["percentage16_Hillary_Clinton"] = 	percentage16_Hillary_Clinton
        elections_dict2["total_votes16"] = 	total_votes16
        elections_dict2["votes16_Donald_Trump"] = 	votes16_Donald_Trump
        elections_dict2["votes16_Hillary_Clinton"] = 	votes16_Hillary_Clinton
        elections_dict2["percentage20_Donald_Trump"] = 	percentage20_Donald_Trump
        elections_dict2["percentage20_Joe_Biden"] = 	percentage20_Joe_Biden
        elections_dict2["total_votes20"] = 	total_votes20
        elections_dict2["votes20_Donald_Trump"] = 	votes20_Donald_Trump
        elections_dict2["votes20_Joe_Biden"] = 	votes20_Joe_Biden
        elections_dict2["cases"] = 	cases
        elections_dict2["deaths"] = 	deaths
        elections_dict2["percentage_deaths"] = 	percentage_deaths
        elections_dict2["TotalPop"] = 	TotalPop
        elections_dict2["Men"] = 	Men
        elections_dict2["Women"] = 	Women
        elections_dict2["Hispanic"] = 	Hispanic
        elections_dict2["White"] = 	White
        elections_dict2["Black"] = 	Black
        elections_dict2["Native"] = 	Native
        elections_dict2["Asian"] = 	Asian
        elections_dict2["Pacific"] = 	Pacific
        elections_dict2["VotingAgeCitizen"] = 	VotingAgeCitizen
        elections_dict2["Income"] = 	Income
        elections_dict2["IncomePerCap"] = 	IncomePerCap
        elections_dict2["Poverty"] = 	Poverty
        elections_dict2["Unemployment"] = 	Unemployment
        elections_dict2["Total_Mail_Ballots_Returned20"] = 	Total_Mail_Ballots_Returned20
        elections_dict2["Mail_Ballots_Returned_Trump20"] = 	Mail_Ballots_Returned_Trump20
        elections_dict2["Mail_Ballots_Returned_Biden20"] = 	Mail_Ballots_Returned_Biden20

        votesTot.append(elections_dict2)


    return jsonify(votesTot)    

if __name__ == '__main__':
    app.run(debug=True)    


