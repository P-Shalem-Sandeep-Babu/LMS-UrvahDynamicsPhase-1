import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Trophy, Medal, Star } from "lucide-react";
import { motion } from "motion/react";

const leaderboardData = [
  { id: 1, name: "Sarah Connor", score: 9850, avatar: "https://i.pravatar.cc/150?u=admin_01", rank: 1, badges: 12 },
  { id: 2, name: "Alex Johnson", score: 9240, avatar: "https://i.pravatar.cc/150?u=stu_01", rank: 2, badges: 10 },
  { id: 3, name: "Marcus Wright", score: 8500, avatar: "https://i.pravatar.cc/150?u=trn_01", rank: 3, badges: 8 },
  { id: 4, name: "Elena Gilbert", score: 8100, avatar: "https://i.pravatar.cc/150?u=elena", rank: 4, badges: 7 },
  { id: 5, name: "Damon Salvatore", score: 7900, avatar: "https://i.pravatar.cc/150?u=damon", rank: 5, badges: 5 },
];

export const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Global Leaderboard</h1>
        <p className="text-muted-foreground">Keep learning to climb the ranks and earn exclusive badges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-end">
         {/* Rank 2 */}
         <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="order-2 md:order-1">
            <Card className="glass-card border-none bg-gradient-to-t from-slate-200/50 dark:from-slate-800/50 to-transparent relative overflow-hidden text-center pb-6">
               <div className="absolute top-0 inset-x-0 h-1 bg-slate-400" />
               <CardHeader className="pt-8">
                  <div className="relative mx-auto w-20 h-20">
                     <Avatar className="w-20 h-20 border-4 border-background shadow-xl">
                        <AvatarImage src={leaderboardData[1].avatar} />
                        <AvatarFallback>AJ</AvatarFallback>
                     </Avatar>
                     <div className="absolute -bottom-3 -right-2 bg-slate-200 dark:bg-slate-700 w-8 h-8 rounded-full border-2 border-background flex items-center justify-center font-bold text-sm shadow-md">2</div>
                  </div>
                  <CardTitle className="mt-4">{leaderboardData[1].name}</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="font-mono text-2xl font-black text-slate-600 dark:text-slate-300">{leaderboardData[1].score.toLocaleString()}</div>
                 <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Points</p>
               </CardContent>
            </Card>
         </motion.div>

         {/* Rank 1 */}
         <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="order-1 md:order-2 z-10">
            <Card className="glass-card border-none shadow-xl shadow-yellow-500/10 bg-gradient-to-t from-yellow-500/20 dark:from-yellow-500/10 to-transparent relative overflow-hidden text-center pb-8 scale-105">
               <div className="absolute top-0 inset-x-0 h-2 bg-yellow-400" />
               <div className="absolute -top-4 -right-4 text-yellow-500/20 w-32 h-32 rotate-12">
                  <Trophy className="w-full h-full" />
               </div>
               <CardHeader className="pt-10">
                  <div className="relative mx-auto w-24 h-24">
                     <Avatar className="w-24 h-24 border-4 border-yellow-400 shadow-2xl shadow-yellow-500/50">
                        <AvatarImage src={leaderboardData[0].avatar} />
                        <AvatarFallback>SC</AvatarFallback>
                     </Avatar>
                     <div className="absolute -bottom-3 -right-2 bg-yellow-400 text-yellow-950 w-10 h-10 rounded-full border-2 border-background flex items-center justify-center font-black text-lg shadow-md">1</div>
                  </div>
                  <CardTitle className="mt-4 text-xl">{leaderboardData[0].name}</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center justify-center gap-2 mb-2">
                   <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                   <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mb-1" />
                   <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                 </div>
                 <div className="font-mono text-3xl font-black text-yellow-600 dark:text-yellow-400">{leaderboardData[0].score.toLocaleString()}</div>
                 <p className="text-xs font-bold text-yellow-600/70 dark:text-yellow-400/70 uppercase tracking-widest mt-1">Points</p>
               </CardContent>
            </Card>
         </motion.div>

         {/* Rank 3 */}
         <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="order-3">
            <Card className="glass-card border-none bg-gradient-to-t from-amber-700/20 dark:from-amber-900/40 to-transparent relative overflow-hidden text-center pb-6">
               <div className="absolute top-0 inset-x-0 h-1 bg-amber-600" />
               <CardHeader className="pt-8">
                  <div className="relative mx-auto w-20 h-20">
                     <Avatar className="w-20 h-20 border-4 border-background shadow-xl">
                        <AvatarImage src={leaderboardData[2].avatar} />
                        <AvatarFallback>MW</AvatarFallback>
                     </Avatar>
                     <div className="absolute -bottom-3 -right-2 bg-amber-600 text-white w-8 h-8 rounded-full border-2 border-background flex items-center justify-center font-bold text-sm shadow-md">3</div>
                  </div>
                  <CardTitle className="mt-4">{leaderboardData[2].name}</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="font-mono text-2xl font-black text-amber-700 dark:text-amber-500">{leaderboardData[2].score.toLocaleString()}</div>
                 <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Points</p>
               </CardContent>
            </Card>
         </motion.div>
      </div>

      <Card className="glass-card border-none overflow-hidden">
         <div className="divide-y divide-border/50">
            {leaderboardData.slice(3).map((user, i) => (
              <motion.div 
                 key={user.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.4 + i * 0.1 }}
                 className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
              >
                 <div className="w-8 text-center font-bold text-muted-foreground">{user.rank}</div>
                 <Avatar className="h-10 w-10 border border-border/50">
                   <AvatarImage src={user.avatar} />
                   <AvatarFallback>{user.name[0]}</AvatarFallback>
                 </Avatar>
                 <div className="flex-1">
                   <p className="font-medium">{user.name}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <Badge variant="outline" className="gap-1 hidden sm:flex">
                       <Medal className="w-3 h-3 text-primary" /> {user.badges} Badges
                    </Badge>
                    <div className="font-mono font-bold text-lg w-20 text-right">{user.score.toLocaleString()}</div>
                 </div>
              </motion.div>
            ))}
         </div>
      </Card>
    </div>
  );
};
