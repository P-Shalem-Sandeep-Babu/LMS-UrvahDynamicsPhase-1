import React from 'react';
import { Menu, Search, Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../components/ui/sheet';
import { ScrollArea } from '../components/ui/scroll-area';
import { Role } from '../data/mock';
import { getNavigationByRole } from '../utils/navigation';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { NotificationDropdown } from '../components/notifications/NotificationDropdown';
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
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split('/').filter((x) => x);
  
  return (
    <header className="sticky top-0 z-30 flex h-16 md:h-20 items-center justify-between px-4 md:px-10 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden shrink-0" />} nativeButton={false}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
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
                    // @ts-ignore
                    <SheetClose key={item.href} asChild>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) => cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium transition-all group",
                          isActive ? "bg-primary/10 text-primary border-r-2 border-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.title}
                      </NavLink>
                    </SheetClose>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex flex-col justify-center">
           <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 hidden lg:inline-block">Current Path</span>
              <div className="flex items-center gap-2 text-xs font-mono">
                 <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-muted-foreground/80 hover:text-foreground transition-colors">src</BreadcrumbLink>
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
                              <BreadcrumbLink href={to} className="capitalize text-muted-foreground/80 hover:text-foreground transition-colors">{value.replace('-', ' ')}</BreadcrumbLink>
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
            className="w-full bg-foreground/5 border border-border rounded-sm py-2 px-4 text-xs focus-visible:ring-0 focus:border-primary/50 transition-all font-mono"
          />
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 border-l border-border pl-4 md:pl-8">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-none w-8 h-8 hover:bg-foreground/5" />} nativeButton={false}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-green-500" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-panel border-border rounded-none">
              <DropdownMenuItem onClick={() => setTheme("light")} className="text-xs font-mono"><Sun className="mr-2 h-3 w-3" /> Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="text-xs font-mono"><Moon className="mr-2 h-3 w-3" /> Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="text-xs font-mono"><Laptop className="mr-2 h-3 w-3" /> System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NotificationDropdown />

          {/* Profile / Settings */}
          <Link to="/settings" className="w-8 h-8 rounded-full border border-border bg-foreground/5 flex items-center justify-center text-[10px] font-bold uppercase cursor-pointer hover:bg-foreground/10 transition-colors" title="Settings & Profile">
            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </Link>
        </div>
      </div>
    </header>
  );
};
