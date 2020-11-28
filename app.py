  
# import Dependencies
import numpy as np
import sqlalchemy

from sqlalchemy import create_engine, func ,inspect
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import Flask, jsonify

# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Base.classes.keys()

# Save references to each table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

inspector = inspect(engine)
inspector.get_table_names()

# data_setup = datetime(Measurement.date)

# Flask Setup
#################################################
app = Flask(__name__)


# Query for the dates and temperature observations from the last year.
@app.route("/")
def home():
    return("/api/v1.0/precipitation<br/>"
    "/api/v1.0/stations<br/>"
    "/api/v1.0/tobs<br/>"
    "/api/v1.0/2017-01-01<br/>")

@app.route("/api/v1.0/precipitation")
def precipitation():
    results1 = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date>="2016-08-23").all()
    first_dict = list(np.ravel(results1))
    return jsonify(first_dict)

#   * Return a JSON list of stations from the dataset.

@app.route("/api/v1.0/stations")
def stations():
    results2 = session.query(Station.station, Station.name).all()
    sec_dict = list(np.ravel(results2))
    return jsonify(sec_dict)

# # #  Convert the query results to a Dictionary.
    # sec_dict = []
    # for sta in results2:
    #     station_dict = {}
    #     station_dict["station"] = Station.station
    #     station_dict["name"] = Station.name
    #     sec_dict.append(station_dict)



# #   * Return a JSON list of Temperature Observations (tobs) for the previous year.

@app.route("/api/v1.0/tobs")
def tobs():
    results3 = session.query(Measurement.date, Measurement.tobs).\
        filter(Measurement.date>="2016-08-23").\
        filter(Measurement.date<="2017-08-23").all()
    temp_dict = list(np.ravel(results3))
    return jsonify(temp_dict)

# # #  Convert the query results to a Dic

# #  Convert the query results to a Dictionary.
    # third_dict = []
    # for temps in results3:
    #     temp_dict = {}
    #     temp_dict["date"] = measurement.date
    #     temp_dict["tobs"] = measurement.tobs
    #     third_dict.append(temp_dict)

# #   * Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.

# #   * When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` for all dates greater than and equal to the start date.

# #   * When given the start and the end date, calculate the `TMIN`, `TAVG`, and `TMAX` for dates between the start and end date inclusive.


@app.route("/api/v1.0/<date>")
def start1(date):
    results4 = session.query((Measurement.date, func.avg(Measurement.tobs), func.max(Measurement.tobs), func.min(Measurement.tobs)).\
        filter(Measurement.date)>=date).all()
    temp_dates = list(np.ravel(results4))
    start_dict = {}
    start_dict["Date"] = s.Date
    start_dict["Avg"] = s.func.avg(Measurement.tobs)
    start_dict["Min"] = s.func.min(Measurement.tobs)
    start_dict["Max"] = s.func.max(Measurement.tobs)
    five_dict.append(start_dict)     
    return jsonify(five_dict)
    
if __name__ == '__main__':
    app.run(debug=True)