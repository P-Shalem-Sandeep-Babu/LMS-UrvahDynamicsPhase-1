import React from 'react';
import { Menu, Bell, Search, Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { ScrollArea } from '../components/ui/scroll-area';
import { notifications, Role } from '../data/mock';
import { getNavigationByRole } from '../utils/navigation';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NotificationBell } from '../components/realtime/NotificationBell';
import { cn } from '../lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"


export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRoleSwitch = (role: Role) => {
    switchRole(role);
    navigate('/dashboard');
  };

  const pathnames = location.pathname.split('/').filter((x) => x);
  
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between px-10 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r-border/50 bg-background/95 backdrop-blur-xl p-0">
            <div className="flex flex-col h-full">
              <div className="h-20 flex items-center px-10 border-b border-border/50">
                 <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Urvah Dynamics LMS
                 </span>
              </div>
              <ScrollArea className="flex-1 py-4">
                <div className="px-4 space-y-1">
                  {getNavigationByRole(user.role).map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium transition-all group",
                        isActive ? "bg-primary/10 text-primary border-r-2 border-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex flex-col justify-center">
           <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-white/30 hidden lg:inline-block">Current Path</span>
              <div className="flex items-center gap-2 text-xs font-mono">
                 <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-white/40 hover:text-white transition-colors">src</BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathnames.map((value, index) => {
                      const last = index === pathnames.length - 1;
                      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                      return (
                        <React.Fragment key={to}>
                          <BreadcrumbSeparator className="text-white/20">/</BreadcrumbSeparator>
                          <BreadcrumbItem>
                            {last ? (
                              <BreadcrumbPage className="capitalize text-primary">{value.replace('-', ' ')}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink href={to} className="capitalize text-white/40 hover:text-white transition-colors">{value.replace('-', ' ')}</BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                        </React.Fragment>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative hidden w-full max-w-sm md:block lg:max-w-xs">
          <Input
            type="text"
            placeholder="Global Search Command + K"
            className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-4 text-xs focus-visible:ring-0 focus:border-primary/50 transition-all font-mono"
          />
        </div>
        
        <div className="flex items-center gap-4 border-l border-white/10 pl-8">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-none w-8 h-8 hover:bg-white/5">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-panel border-white/10 rounded-none">
              <DropdownMenuItem onClick={() => setTheme("light")} className="text-xs font-mono"><Sun className="mr-2 h-3 w-3" /> Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="text-xs font-mono"><Moon className="mr-2 h-3 w-3" /> Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="text-xs font-mono"><Laptop className="mr-2 h-3 w-3" /> System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NotificationBell />

          {/* Profile / Role Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-bold uppercase cursor-pointer hover:bg-white/10 transition-colors">
                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass-panel border-white/10 rounded-none" align="end" forceMount>
              <DropdownMenuLabel className="font-normal border-b border-white/10 pb-2 mb-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none uppercase">{user.name}</p>
                  <p className="text-[10px] leading-none text-white/40 font-mono">
                    {user.email}
                  </p>
                  <div className="pt-2">
                     <span className="text-[9px] uppercase tracking-widest text-primary font-bold">{user.role}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem className="text-xs">Profile Config</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">System Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuLabel className="text-[9px] text-white/40 pt-2 uppercase tracking-widest">Switch Role (Dev)</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleRoleSwitch('admin')} className="text-xs font-mono">Admin View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleSwitch('faculty')} className="text-xs font-mono">Faculty View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleSwitch('trainer')} className="text-xs font-mono">Trainer View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleSwitch('student')} className="text-xs font-mono">Student View</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:bg-red-500/10 focus:text-red-500 text-xs font-bold uppercase tracking-widest">Terminate Session</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
