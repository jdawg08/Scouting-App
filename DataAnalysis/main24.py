import AVG 

AVG.robot_avg(1720)

'''
import argparse
parser = argparse.ArgumentParser(prog='Data Analysis 2024',description='Analyzes data using various Python tools')
#add arguments before making .parse_args here (its required idk why) -- specific data
parser.add_argument('--get_match', type=int,help="Stats for each robot in a match")
parser.add_argument('--robot_avg', type=int,help="Avg. stats of a robot")
parser.add_argument('--standard_dev', type=int,help="Standard deviation of a robot's stats")
parser.add_argument('--position_values', required=False,help="Heatmap of all robots' starting positions")
parser.add_argument('--avg_score_percent', type=int,help="Average score percentage of a robot")
parser.add_argument('--get_comments', type=str,help="Enter a phrase, program gets all comments containing the phrase")

args = parser.parse_args()

if args.get_match:
    arg1 = AVG.get_match(args.get_match)
elif args.robot_avg:
    arg2 = AVG.robot_avg(args.robot_avg)
elif args.standard_dev:
    arg3 = AVG.standard_dev(args.standard_dev)
elif args.position_values:
    arg4 = AVG.position_values()
elif args.avg_score_percent:
    arg5 = AVG.avg_score_percent(args.avg_score_percent)
elif args.get_comments:
    arg6 = AVG.get_comments(args.get_comments)
    '''