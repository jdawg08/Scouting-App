import pandas as pd
from pandas.core.common import flatten
import csv
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import math as Math
from retry import retry

myFile = "C:/Users/Robotics/Documents/GitHub/ScoutingPASS/DataAnalysis/2024Mish_Match56.xlsx"

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
            print('Name: ' + str(list[0]) + ', ' + str(list[1]) + ', Match ' + str(list[2]) + ', Robot: ' + str(list[3]) + ', Team ' + str(list[4]))
            print('Info -')
            print('Start Position: ' + str(list[5]))
            print('Left Start zone?: ' + str(list[6]))
            print('Amp Score - Auto: ' + str(list[7]))
            print('Amp Misses - Auto: ' + str(list[8]))
            print('Speaker Scores: ' + str(list[9]))
            print('Speaker Misses: ' + str(list[10]))
            print('Near Scores: ' + str(list[11]))
            print('Near Misses: ' + str(list[12]))
            print('Far Away Scores: ' + str(list[13]))
            print('Far Away Misses: ' + str(list[14]))
            print('Amp Scoress - teleop: ' + str(list[15]))
            print('Amp misses - teleop: ' + str(list[16]))
            print('Pickup from: ' + str(list[17]))
            print('Final Status: ' + str(list[18]))
            print('Chain Position: ' + str(list[19]))
            print('Note in trap: ' + str(list[20]))
            print('Human?: ' + str(list[21]))
            print('Made High Note?: ' + str(list[22]))
            print('Driver Skill: ' + str(list[23]))
            print('Defense Rating: ' + str(list[24]))
            print('Speed Rating: ' + str(list[25]))
            print('Died/Immobilized: ' + str(list[26]))
            print('Tippy?: ' + str(list[27]))
            print('Stuck note: ' + str(list[28]))
            print('Comments: ' + str(list[29]))
            print('Penalty #: ' + str(list[30]))
            print('___________________________________________________')
            print(' ')
            
def __allStuff(team):
    totals = [0,0,0,0,0,0,0,0,0,0,0]
    counter = 0
    for list in myData:
        if list[4] == team:
            totals[0] += list[7]
            totals[1] += list[8]
            totals[2] += list[9]
            totals[3] += list[10]
            totals[4] += list[11]
            totals[5] += list[12]
            totals[6] += list[13]
            totals[7] += list[14]
            totals[8] += list[15]
            totals[9] += list[16]
            totals[10] += list[30]
            counter += 1
    q = 0
    while q < len(totals):
        totals[q] = totals[q] / counter
        q+=1 
    
    return totals  



def robot_avg(t):
    stack = __allStuff(t)
    l = 0
    while l < len(stack):
        if Math.isnan(stack[l]) == True:
            stack[l] = 0
        l += 1
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
    holders = [7,8,9,10,11,12,13,14,15,16,30]
    place = 0
    while place < len(holders):
        for list in myData:
            if list[4] == team_num:
                tempor = holders[place]
                sd.append(list[tempor])
        std = np.std(sd)
        labelers = holders[place]
        print(names[labelers] + ": standard deviation is " + str(std))
        #print(std)
        sd.clear()
        place += 1

def __flatten_extend(matrix):
     flat_list = []
     for row in matrix:
         flat_list.extend(row)
     return flat_list

def __split_list(lst, n):
    """Split a list into a list of lists with n items per sublist.

    Args:
        lst: The input list.
        n: The number of items per sublist.

    Returns:
        A list of lists, each with n items.
    """

    result = []
    for i in range(0, len(lst), n):
        result.append(lst[i:i + n])
    return result

def position_values():
    '''
        An auton start position heatmap
    '''
    #score_stuff = max_min_hit_miss()
    #print(score_stuff)
    labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]
    pos_vals = [[0,0,0,0,0,0,0,0,0,0,0,0] for x in range(6)]
    pos_vals = __flatten_extend(pos_vals)
    print(pos_vals)

    #labels for heatmap
    temp = []
    heatData = []
    i=0
    #type 1 is auto starting positions
    for l in myData:
        temp.append(l[5])
    for item in temp:
        item = int(item[1:len(item)-1])
        heatData.append(item)

    print(heatData)
    
    #Labels for the heatmap are made to shown along with data
    while i < len(heatData):
        variable = heatData[i]
        pos_vals[variable-1] += 1
        print(pos_vals)
        i += 1 
    labels = np.array(labels)
    pos_vals = __split_list(pos_vals,12)
    pos_vals = np.array(pos_vals)

    formatted_text = (np.asarray(["{0}\n{1:.2f}".format(labels, pos_vals) for pos_vals, labels in zip(pos_vals.flatten(), labels.flatten())])).reshape(6, 12)
    map1 = sns.heatmap(data=pos_vals,cmap="cool",xticklabels=False,yticklabels=False,annot=formatted_text,fmt="")
    plt.show()


@retry(ZeroDivisionError,delay=1)
def avg_score_percent():
    group = int(input('Enter a team number and get score percentages'))

    s = __allStuff(group)
    
    if s[0] > 0 or s[1] > 0:
        amp_score_auto_p = (s[0]/(s[0]+s[1])) * 100
    else:
        amp_score_auto_p = "0"

    if s[2] > 0 or s[3] > 0:
        speak_score_auto_p = (s[2]/(s[2]+s[3])) * 100
    else:
        speak_score_auto_p = "0"

    if s[4] > 0 or s[5] > 0:
        near_score_p = (s[4]/(s[4]+s[5])) * 100
    else:
        near_score_p = "0"

    if s[6] > 0 or s[7] > 0:
        far_score_p = (s[6]/(s[6]+s[7])) * 100
    else:
        far_score_p = "0"

    if s[8] > 0 or s[9] > 0:
        amp_score_tele_p = (s[8]/(s[8]+s[9])) * 100
    else:
        amp_score_tele_p = "0"

    
    

    print('Score percentages:')
    print("Amp score auton percentage is " + str(amp_score_auto_p) + " %")
    print("Speaker score auton percentage is " + str(speak_score_auto_p) + " %")
    print("Near scores percentage is " + str(near_score_p) + " %")
    print("Far score percentage is " + str(far_score_p) + " %")
    print("Amp score teleop percentage is " + str(amp_score_tele_p) + " %")


def get_comments():
    param = input("Enter a desired phrase")
    for collection in myData:
        if type(collection[29]) == float:
            collection[29] = " "
        if collection[29].find(param) != -1:
            print("Match " + str(collection[2]) + ", Robot " + str(collection[3]) + ", Team #: " + str(collection[4]) + ", " + str(collection[0]) + " said " + "'" + collection[29] + "'.")
        
    

    
    