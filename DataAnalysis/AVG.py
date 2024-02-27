import pandas as pd
from pandas.core.common import flatten
import csv
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

myFile = "C:/Users/Robotics/Documents/GitHub/ScoutingPASS/DataAnalysis/experimental.xlsx"

# Reading an excel file
names = ['Scouter', 'Comp', 'Matchlvl', 'MatchNum', 'Robot', 'Team Number', 'Auto StartPosition', 'LeaveStartZone', 'AmpScore-Auto', 'SpeakScore-Auto', 'AmpScore-Teleop','hit_miss_coords', 'hit_miss', 'hit_and_miss_xandy', 'SpeakScore-Teleop', 'Amplify#', 'PickupFrom', 'StageTimer', 'FinalStatus', 'Noteintrap?', 'DriverSkill', 'DefenseRating', 'SpeedRating', 'Died?', 'Tippy?', 'DroppedNotes?', 'GoodPartner?','Comments']
excelFile = pd.read_excel(myFile,header=None,names=names)

# Converting excel file into CSV file
excelFile.to_csv("ResultCsvFile.csv",index=False)

# Reading and Converting the output csv file into a dataframe object
global dataframeObject
dataframeObject = pd.DataFrame(pd.read_csv("ResultCsvFile.csv"))

# Displaying the dataframe object
myData = dataframeObject.values.tolist()



def get_match(num):
    for list in myData:
        if list[3] == num:
            print('Name: ' + str(list[0]) + ', ' + str(list[1]) + ', Match ' + str(list[3]) + ' (' + str(list[2]) + ')' + ', Robot: ' + str(list[4]) + ', Team ' + str(list[5]))
            print('Info -')
            print('Start Position: ' + str(list[6]))
            print('Left Start zone?: ' + str(list[7]))
            print('Amp Score - Auto: ' + str(list[8]))
            print('Speaker Score - Auto: ' + str(list[9]))
            print('Amp Score - Teleop: ' + str(list[10]))
            print('Hit/miss coords: ' + str(list[11]))
            print('Hits or misses: ' + str(list[12]))
            print('Hits or misses exact coords: ' + str(list[13]))
            print('Speak Score - Teleop: ' + str(list[14]))
            print('Times amplified: ' + str(list[15]))
            print('Pickup from?: ' + str(list[16]))
            print('Stage timer: ' + str(list[17]))
            print('Final Status: ' + str(list[18]))
            print('Note in trap?: ' + str(list[19]))
            print('Driver Skill: ' + str(list[20]))
            print('Defense Rating: ' + str(list[21]))
            print('Speed Rating: ' + str(list[22]))
            print('Died?: ' + str(list[23]))
            print('Tippy?: ' + str(list[24]))
            print('Dropped Notes: ' + str(list[25]))
            print('Good Partner: ' + str(list[26]))
            print('Comments: ' + str(list[27]))
            print('___________________________________________________')
            print(' ')
            

def __allStuff(team):
    totals = [0.0,0,0,0,0,0,0,0]
    counter = 0
    for list in myData:
        if list[5] == team:
            #amp_score_auto
            totals[0] += list[8]
            #speaker_score_auto
            totals[1] += list[9]
            #amp_sscore_teleop
            totals[2] += list[10]
            #speaker_score_teleop
            totals[3] += list[14]
            #times amplified
            totals[4] += list[15]
            #stage timer
            totals[5] += list[17]
            #speed_rating
            totals[6] += list[22]
        counter += 1 
    i = 0
    while i < len(totals):
        totals[i] = totals[i] / counter
        i+=1 
    
    return totals  

def __make_list_of_tuples(nn):
  """Returns a list of n number of tuples."""
  list_of_tuples = []
  for i in range(nn):
    tuple = (0, 0)
    list_of_tuples.append(tuple)
  return list_of_tuples


def robot_avg(t):
    stack = __allStuff(t)
    print('Avg. amp score - auto: ' + str(stack[0]))
    print('Avg. speaker score - auto: ' + str(stack[1]))
    print('Avg. amp score - teleop: ' + str(stack[2]))
    print('Avg. speaker score - teleop: ' + str(stack[3]))
    print('Avg. times amplified: ' + str(stack[4]))
    print('Avg. time on stage Timer: ' + str(stack[5]))
    print('Avg, speed rating: ' + str(stack[6]))
    
    
def standard_dev(team_num):
    sd = []
    labelers = 0
    holders = [8,9,10,14,15,17,22]
    place = 0
    while place < len(holders):
        for list in myData:
            if list[5] == team_num:
                tempor = holders[place]
                sd.append(list[tempor])
        std = np.std(sd)
        labelers = holders[place]
        print(names[labelers] + ": standard deviation is " + str(std))
        #print(std)
        sd.clear()
        place += 1




    

    
    