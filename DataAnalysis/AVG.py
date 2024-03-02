import pandas as pd
from pandas.core.common import flatten
import csv
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

myFile = "C:/Users/Robotics/Documents/GitHub/ScoutingPASS/DataAnalysis/experimental.xlsx"

# Reading an excel file
names = ['Scouter', 'Comp', 'Matchlvl', 'MatchNum', 'Robot', 'Team Number', 'Auto StartPosition', 'LeaveStartZone', 'AmpScore-Auto', 'AmpMiss-Auto', 'SpeakerScores','SpeakerMiss', 'NearScore', 'NearMiss', 'FarAwayScore', 'FarAwayMiss', 'AmpScores_tele', 'AmpMisses_tele', 'Pickupfrom', 'finalstatus', 'chainpos', 'noteintrap', 'human?', 'madehignnote', 'driverskill', 'defenserating', 'speedrating','died','tippy','stuck_note','Comments','pen#']
excelFile = pd.read_excel(myFile)

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
            print('Amp Misses - Auto: ' + str(list[9]))
            print('Speaker Scores: ' + str(list[10]))
            print('Speaker Misses: ' + str(list[11]))
            print('Near Scores: ' + str(list[12]))
            print('Near Misses: ' + str(list[13]))
            print('Far Away Scores: ' + str(list[14]))
            print('Far Away Misses: ' + str(list[15]))
            print('Amp Scoress - teleop: ' + str(list[16]))
            print('Amp misses - teleop: ' + str(list[17]))
            print('Pickup from: ' + str(list[18]))
            print('Final Status: ' + str(list[19]))
            print('Chain Position: ' + str(list[20]))
            print('Note in trap: ' + str(list[21]))
            print('Human?: ' + str(list[22]))
            print('Made High Note?: ' + str(list[23]))
            print('Driver Skill: ' + str(list[24]))
            print('Defense Rating: ' + str(list[25]))
            print('Speed Rating: ' + str(list[26]))
            print('Died/Immobilized: ' + str(list[27]))
            print('Tippy?: ' + str(list[28]))
            print('Stuck note: ' + str(list[29]))
            print('Comments: ' + str(list[30]))
            print('Penalty #: ' + str(list[31]))
            print('___________________________________________________')
            print(' ')
            

def __allStuff(team):
    totals = [0,0,0,0,0,0,0,0,0,0,0]
    counter = 0
    for list in myData:
        if list[5] == team:
            totals[0] += list[8]
            totals[1] += list[9]
            totals[2] += list[10]
            totals[3] += list[11]
            totals[4] += list[12]
            totals[5] += list[13]
            totals[6] += list[14]
            totals[6] += list[15]
            totals[6] += list[16]
            totals[6] += list[17]
            totals[6] += list[31]
        counter += 1 
    i = 0
    while i < len(totals):
        totals[i] = totals[i] / counter
        i+=1 
    
    return totals  



def robot_avg(t):
    stack = __allStuff(t)
    print('Avg. amp score in auto: ' + str(stack[0]))
    print('Avg. amp misses in auto: ' + str(stack[1]))
    print('Avg. speaker scores: ' + str(stack[2]))
    print('Avg. speaker misses: ' + str(stack[3]))
    print('Avg. near scores: ' + str(stack[4]))
    print('Avg. near misses: ' + str(stack[5]))
    print('Avg. far away scores: ' + str(stack[6]))
    print('Avg. far away misses: ' + str(stack[7]))
    print('Avg. amp scores - teleop: ' + str(stack[8]))
    print('Avg. amp misses - teleop: ' + str(stack[9]))
    print('Avg. # of penalties: ' + str(stack[10]))

    
    
def standard_dev(team_num):
    sd = []
    labelers = 0
    holders = [8,9,10,11,12,13,14,15,16,17,31]
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

def position_values():
    '''
        For the parameter, 1 is auton start position heatmap, 2 is hit/miss position heatmap
    '''
    #score_stuff = max_min_hit_miss()
    #print(score_stuff)
    labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]
    pos_vals = [[0,0,0,0,0,0] for x in range(6)]
    print(pos_vals)

    #labels for heatmap
    temp = []
    heatData = []
    i=0
    #type 1 is auto starting positions
    for l in myData:
        temp.append(l[6])
    for item in temp:
        item = int(item[1:len(item)-1])
        heatData.append(item)

    print(heatData)
    
    #Labels for the heatmap are made to shown along with data
    while i < len(heatData):
        variable = heatData[i]
        pos_vals[variable-1] += 1
        i += 1 
    labels = np.array(labels)

    formatted_text = (np.asarray(["{0}\n{1:.2f}".format(labels, pos_vals) for pos_vals, labels in zip(pos_vals.flatten(), labels.flatten())])).reshape(6, 12)
    map1 = sns.heatmap(data=pos_vals,cmap="cool",xticklabels=False,yticklabels=False,annot=formatted_text,fmt="")
    plt.show()



    

    
    