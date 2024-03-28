import pandas as pd
from pandas.core.common import flatten
import csv
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import math as Math
from retry import retry

myFile = "C:/Users/Robotics/Documents/GitHub/ScoutingPASS/Excel/2024/2024 Excel.xlsm"

# Reading an excel file
#names = ['Scouter', 'Comp', 'Matchlvl', 'MatchNum', 'Robot', 'Team Number', 'Auto StartPosition', 'LeaveStartZone', 'AmpScore-Auto', 'AmpMiss-Auto', 'SpeakerScores','SpeakerMiss', 'NearScore', 'NearMiss', 'FarAwayScore', 'FarAwayMiss', 'AmpScores_tele', 'AmpMisses_tele', 'Pickupfrom', 'finalstatus', 'chainpos', 'noteintrap', 'human?', 'madehignnote', 'driverskill', 'defenserating', 'speedrating','died','tippy','stuck_note','Comments','pen#']
excelFile = pd.read_excel(myFile,sheet_name="Match Scouting Data")

# Converting excel file into CSV file
excelFile.to_csv("ResultCsvFile.csv",index=False)

# Reading and Converting the output csv file into a dataframe object
global dataframeObject
dataframeObject = pd.DataFrame(pd.read_csv("ResultCsvFile.csv"))

# Displaying the dataframe object
myData = dataframeObject.values.tolist()



def get_match(num):
    for list in myData:
        if list[4] == num:
            print('Name: ' + str(list[0]) + ', ' + 'Event: ' + str(list[2]) + 'Level: ' + str(list[3]) + ', Match ' + str(list[4]) + ', Robot: ' + str(list[5]) + ', Team ' + str(list[6]))
            print('Info -')
            print(' ')
            
            if list[7] == 'bas':
                sp = 'Between Amp and Speaker'
            elif list[7] == 'ifsas':
                sp = 'In front of speaker amp side'
            elif list[7] == 'insm':
                sp = 'In front of speaker middle'
            elif list[7] == 'insas':
                sp = 'In front of speaker source side'
            elif list[7] == 'bsss':
                sp = 'Between speaker and source'
            print('Starting Position: ' + sp)
            
            if list[8] == 'afsna':
                fsa = 'First shot not attempted'
            elif list[8] == 'punz':
                fsa = 'Pick up note in wing'
            elif list[8] == 'puncl':
                fsa = 'Pick up note - center line'
            elif list[8] == 'sz':
                fsa = 'Only leave starting zone'
            elif list[8] == 'o':
                fsa = 'Other'
            elif list[8] == 'no':
                fsa = 'Nothing'
            print('Action after first shot: ' + fsa)

            print('Auto Speaker Scores: ' + str(int(list[11])))
            print('Auto Speaker Misses: ' + str(int(list[12])))
            print('Teleop Speaker Scores: ' + str(int(list[13])))
            print('Teleop Speaker Misses: ' + str(int(list[14])))
            
            if list[15] == 'ne':
                nfs = 'Near'
            elif list[15] == 'f':
                nfs = 'Far'
            elif list[15] == 'b':
                nfs = 'Both'
            elif list[15] == 'n':
                nfs = 'None'
            print('Near or far shots?: ' + nfs)
            
            print('Only shoots with bumpers touching speaker?: ' + str(bool(list[16])))
            print('Amp Scores - teleop: ' + str(list[17]))
            print('Amp misses - teleop: ' + str(list[18]))
            print('Notes shuttled for alliance partners: ' + str(int(list[19])))
            print('Defensive player?: ' + str(bool(list[20])))
            
            if list[21] == 'sbs':
                dfl = 'Shot block at speaker'
            elif list[21] == 'nos':
                dfl = 'Path block near source'
            elif list[21] == 'ao':
                dfl = 'All Over'
            elif list[21] == 'oth':
                dfl = 'Other'
            elif list[21] == 'n':
                dfl = 'None'
            print('Defense location nan: ' + dfl)
            
            print('Penalties: ' + str(list[22]))
            
            if list[23] == 'bl':
                color = 'Only Blue stage'
            elif list[23] == 'rd':
                color = 'Only Red stage'
            elif list[23] == 'bh':
                color = 'Both stages'
            elif list[23] == 'n':
                color = 'No'
            print('Travel through stage?: ' + color)
            
            print('Parked: ' + str(bool(list[25])))
            
            if list[26] == 'o':
                OS = 'Onstage'
            elif list[26] == 'h':
                OS = 'Harmony'
            elif list[26] == 'a':
                OS = 'Attempted and failed'
            elif list[26] == 'x':
                OS = 'Not attempted'
            print('Onstage status ' + OS)
            
            if list[27] == 'mid':
                cps = 'In the middle of chain'
            elif list[27] == 'side':
                cps = 'On chain sides'
            elif list[27] == 'n':
                cps = 'No Chain'
            print('Chain Position: ' + cps)
            
            print('Note in trap: ' + str(bool(list[28])))
            print('Died/Immobilized?: ' + str(bool(list[29])))
            print('Damaged?: ' + str(bool(list[30])))
            print('Note stuck in robot?: ' + str(bool(list[31])))
            print('Comments: ' + str(list[32]))
            print('Drivetrain: ' + str(list[33]))
            print('___________________________________________________')
            print(' ')
            

def __allStuff(team):
    totals = [0,0,0,0,0,0,0,0]
    counter = 0
    for list in myData:
        if list[6] == team:
            totals[0] += list[11]
            totals[1] += list[12]
            totals[2] += list[13]
            totals[3] += list[14]
            totals[4] += list[17]
            totals[5] += list[18]
            totals[6] += list[19]
            totals[7] += list[22]
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
    print('Avg. speaker scores in auto: ' + str(stack[0]))
    print('Avg. speaker misses in auto: ' + str(stack[1]))
    print('Avg. speaker scores in teleop: ' + str(stack[2]))
    print('Avg. speaker misses in teleop: ' + str(stack[3]))
    print('Avg. amp scores in teleop: ' + str(stack[4]))
    print('Avg. amp misses in teleop: ' + str(stack[5]))
    print('Avg. notes shuttled for alliance players: ' + str(stack[6]))
    print('Avg. penalties: ' + str(stack[7]))

'''
@retry(ZeroDivisionError,delay=1)
def standard_dev(team_num):
    sd = []
    labelers = 0
    holders = [11,12,13,14,17,18,19,22]
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



@retry(ZeroDivisionError,delay=1)
def avg_score_percent(group):

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


def get_comments(param):
    for collection in myData:
        if type(collection[29]) == float:
            collection[29] = " "
        if collection[29].find(param) != -1:
            print("Match " + str(collection[2]) + ", Robot " + str(collection[3]) + ", Team #: " + str(collection[4]) + ", " + str(collection[0]) + " said " + "'" + collection[29] + "'.")
'''