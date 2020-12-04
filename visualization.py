import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd 
from dash.dependencies import Input, Output
import plotly.express as px
import numpy as np 

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']
#leer df 
df = pd.ExcelFile('DBcounty.xlsm')
print(df.sheet_names)
available_states = {'AZ', 'GA', 'MI', 'PA', 'WI'} 

df = pd.read_excel('DBcounty.xlsm', sheet_name='AZ')
hombre_az = df['Men'].sum()
#print(hombre_az) 
mujer_az = df['Women'].sum()
#print(mujer_az) 


app = dash.Dash(__name__)#, external_stylesheets=external_stylesheets)

import numpy as np



app.layout = html.Div(children=[

    html.H1(children='US COUNTY ELECTIONS'),

    html.P("States:"),
    dcc.Dropdown(
        id='states', 
        value='AZ', 
        options=[{'value': x, 'label': x} 
                 for x in available_states ],
        clearable=False
    ),
    dcc.Graph(id="pie-chart"), 

     html.H1(children='Population'),

    #grafico 2 
    dcc.Graph(id="tree-map") 
])

@app.callback(
    Output("pie-chart", "figure"), 
    [Input("states", "value")])
def generate_chart(states):
    df = pd.read_excel('DBcounty.xlsm', sheet_name=states)
    print(states)
    hombre = df['Men'].sum()
    mujer = df['Women'].sum()
    names = ['Men','Women']
    print(names)
    values = [hombre,mujer]
    print(values)
    #df = px.data.tips()
    fig = px.pie(values=values, names=names)
    return fig

    #callback grafico 2
@app.callback(
    Output("tree-map", "figure"),
     [Input("states", "value")])
def generate_tree_map(states):
    df = pd.read_excel('DBcounty.xlsm', sheet_name=states)
    hispanic = df['Hispanic'].sum()
    white = df['White'].sum()
    black = df['Black'].sum()
    native = df['Native'].sum()
    asian = df['Asian'].sum()
    pacific = df['Pacific'].sum() 

    data = [['population','hispanic',hispanic],['population','white',white],['population','black',black],['population','native',native],['population','Asian',asian],['population','pacific',pacific]]
    df=pd.DataFrame(data,columns=['population','tribe','amount'])
    fig = px.treemap(df, path=['population','tribe'], values='amount')
    return fig



app.run_server(debug=True)

"""
app.layout = html.Div([
    html.P("Names:"),
    dcc.Dropdown(
        id='names', 
        value='day', 
        options=[{'value': x, 'label': x} 
                 for x in ['smoker', 'day', 'time', 'sex']],
        clearable=False
    ),
    html.P("Values:"),
    dcc.Dropdown(
        id='values', 
        value='total_bill', 
        options=[{'value': x, 'label': x} 
                 for x in ['total_bill', 'tip', 'size']],
        clearable=False
    ),
    dcc.Graph(id="pie-chart"),
])

@app.callback(
    Output("pie-chart", "figure"), 
    [Input("names", "value"), 
     Input("values", "value")])
def generate_chart(names, values):
    fig = px.pie(df, values=values, names=names)
    return fig

app.run_server(debug=True)
"""