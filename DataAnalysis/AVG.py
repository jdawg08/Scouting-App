import pandas as pd
import csv
import numpy as np

myFile = "C:\Users\Robotics\Documents\GitHub\ScoutingPASS\DataAnalysis\Book1.xlsx"

# Reading an excel file
excelFile = pd.read_excel(myFile,names=['Scouter', 'Comp', 'Matchlvl', 'MatchNum', 'Robot', 'Team Number', 'Auto StartPosition', 'LeaveStartZone', 'AmpScore-Auto', 'SpeakScore-Auto', 'AmpScore-Teleop', 'SpeakScore-Teleop', 'Amplify#', 'PickupFrom', 'StageTimer', 'FinalStatus', 'Noteintrap?', 'DriverSkill', 'DefenseRating', 'SpeedRating', 'Died?', 'Tippy?', 'DroppedNotes?', 'GoodPartner?','Comments'])

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
            print('Speak Score - Teleop: ' + str(list[11]))
            print('Times amplified: ' + str(list[12]))
            print('Pickup from?: ' + str(list[13]))
            print('Stage timer: ' + str(list[14]))
            print('Final Status: ' + str(list[15]))
            print('Note in trap?: ' + str(list[16]))
            print('Driver Skill: ' + str(list[17]))
            print('Defense Rating: ' + str(list[18]))
            print('Speed Rating: ' + str(list[19]))
            print('Died?: ' + str(list[20]))
            print('Tippy?: ' + str(list[21]))
            print('Dropped Notes: ' + str(list[22]))
            print('Good Partner: ' + str(list[23]))
            print('___________________________________________________')
            print('                                                   ')
            

def _allStuff(team):
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
            totals[3] += list[11]
            #times amplified
            totals[4] += list[12]
            #stage timer
            totals[5] += list[14]
            #speed_rating
            totals[6] += list[19]
        counter += 1 
    i = 0
    while i < len(totals):
        totals[i] = totals[i] / counter
        i+=1 
    
    return totals  




def robot_avg(t):
    stack = _allStuff(t)
    print('Avg. amp score - auto: ' + str(stack[0]))
    print('Avg. speaker score - auto: ' + str(stack[1]))
    print('Avg. amp score - teleop: ' + str(stack[2]))
    print('Avg. speaker score - teleop: ' + str(stack[3]))
    print('Avg. times amplified: ' + str(stack[4]))
    print('Avg. time on stage Timer: ' + str(stack[5]))
    print('Avg, speed rating: ' + str(stack[6]))
    
    
def standard_dev(team_num):
    np.seterr(invalid='ignore')
    sd = []
    holders = [8,9,10,11,12,14,19]
    h_i = 0
    for list in myData:
        while h_i < len(holders):
            if list[5] == team_num:
                sd.append(list[holders[h_i]])
            std = np.std(sd)
            print(std)
            h_i += 1
            sd = []

    
def position_values():
    print(myData)
    temp = []
    heatData = []
    for l in myData:
        temp.append(l[6])
    for item in temp:
        item = int(item[1:len(item)-1])
        heatData.append(item)
    print(heatData)
    