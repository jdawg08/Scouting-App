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

def max_min_hit_miss():
    '''Tells which positions has highest and lowest # of scores and misses'''
    i = 1
    set = []
    min = [100000,100000]
    max = [0,0]
    #gets hit and miss boolean(true and false) along with positions and maps them accordingly
    data_of_scores =__make_list_of_tuples(72)
    for list in myData:
        set.clear()
        group = list[11]
        group = group.strip("[]")
        group = group.split(",")
        for n in group:
            n = int(n)
            set.append(n)
            
        temp = list[12]
        temp = temp.strip("[]")
        temp = temp.split(",")
        k = 0
        while k < len(temp) - 1:
            if temp[k] == "true":
                temp[k] = 1
                t = temp[k]
                data_of_scores[set[k-1]][0].append(t)
            elif temp[k] == "false":
                temp[k] = 1
                t = temp[k]
                data_of_scores[set[k-1]] = list(data_of_scores[set[k-1]])
                data_of_scores[set[k-1]][1].append(t)
                data_of_scores[set[k-1]]  = tuple(data_of_scores[set[k-1]])
        
        #check which position has max/min # of hits/misses
        
    for u in data_of_scores:
        #min # of hits
        if data_of_scores[u][0] < min[0]:
            min[0] = data_of_scores[u][0]
        #min # of misses
        elif data_of_scores[u][1] < min[1]:
            min[1] = data_of_scores[u][1]
        #max # of hits
        elif data_of_scores[u][0] > max[0]:
            max[0] = data_of_scores[u][0]
        #max # of misses
        elif data_of_scores[u][1] > max[1]:
            max[1] = data_of_scores[u][1]
        
        return max,min
            

            
            



    
    ''' for cluster in myData: 
            group = cluster[11]
            group = group.strip("[]")
            group = group.split(",")
            for n in group:
                n = int(n)
                set.append(n)'''

    
def position_values(version):
    '''
        For the parameter, 1 is auton start position heatmap, 2 is hit/miss position heatmap
    '''
    score_stuff = max_min_hit_miss()
    print(score_stuff)
    labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]
    labels = __split_list(labels,12)
    labels = np.array(labels)
    pos_vals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    counter = 0
    
    #pos_vals = list(flatten(pos_vals))
    #labels for heatmap
    temp = []
    heatData = []
    if version == 1:
        #type 1 is auto starting positions
        for l in myData:
            temp.append(l[6])
        for item in temp:
            item = int(item[1:len(item)-1])
            heatData.append(item)
    elif version == 2:
        for cluster in myData: 
            group = cluster[11]
            group = group.strip("[]")
            group = group.split(",")
            for n in group:
                n = int(n)
                heatData.append(n) 
        print(heatData)
    
    #Labels for the heatmap are made to shown along with data
    while i < len(heatData):
        variable = heatData[i]
        pos_vals[variable-1] = variable
        i += 1
    pos_vals = __split_list(pos_vals,12)
    pos_vals = np.array(pos_vals)

    formatted_text = (np.asarray(["{0}\n{1:.2f}".format(labels, pos_vals) for pos_vals, labels in zip(pos_vals.flatten(), labels.flatten())])).reshape(6, 12)

    map1 = sns.heatmap(data=pos_vals,cmap="cool",xticklabels=False,yticklabels=False,annot=formatted_text,fmt="")
    plt.show()

    #print("Position with max # of hits is " + str(max[0]) + " and position with min # of hits is" + str(min(0)) + ".")
    #print("Position with max # of misses is " + str(max[1]) + " and position with min # of misses is" + str(min(1)) + ".")

        

    #elif type == 2:
        #type 2 is hit/miss coords'''

    
    