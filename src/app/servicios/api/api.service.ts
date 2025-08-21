import { Injectable } from '@angular/core';
import * as uris from '../../utilities/dominos/urls';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';
import { Proyectos } from '../../models/proyectos';
import { Tareas } from '../../models/tareas';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public urlProyectos: string;
  public urlTareas: string;

  // Almacenamiento mock en memoria
  private proyectosMock: Proyectos[] = [];
  private tareasMock: Tareas[] = [];
  private nextProyectoId = 11; 
  private nextTareaId = 201; 

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { 
    this.urlProyectos = uris.PROYECTOS;
    this.urlTareas = uris.TAREAS;
    this.inicializarMockData();
  }

  
  private inicializarMockData(): void {
    this.http.get<any[]>(this.urlProyectos).subscribe(users => {
      this.proyectosMock = this.transformarUsuariosAProyectos(users);
    });

    this.http.get<any[]>(this.urlTareas).subscribe(todos => {
      this.tareasMock = this.transformarTodosATareas(todos);
    });
  }

  // Obtener todos los proyectos
  public obtenerProyectos(): Observable<Proyectos[]> {
    return this.http.get<any[]>(this.urlProyectos).pipe(
      map(users => this.transformarUsuariosAProyectos(users)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error cargando proyectos');
        return throwError(() => error);
      })
    );
  }

  // Obtener un proyecto específico por ID
  public obtenerProyecto(id: number): Observable<Proyectos> {
    const url = `${this.urlProyectos}/${id}`;
    return this.http.get<any>(url).pipe(
      map(user => this.transformarUsuarioAProyecto(user)),
      catchError((error: HttpErrorResponse) => {
        // Si falla la API, buscar en mock
        const proyectoMock = this.proyectosMock.find(p => p.id === id);
        if (proyectoMock) {
          return of(proyectoMock);
        }
        this.errorHandler.handleError(error, `Error cargando proyecto ${id}`);
        return throwError(() => error);
      })
    );
  }

// Crear un nuevo proyecto (usando el formulario )
public crearProyecto(proyecto: Partial<Proyectos>): Observable<Proyectos> {
  return new Observable<Proyectos>(observer => {
    // Simular delay de red
    setTimeout(() => {
      try {
        const nuevoProyecto: Proyectos = {
          id: this.nextProyectoId++,
          name: proyecto.name || '',
          username: proyecto.username || '',
          email: proyecto.email || '',
          address: {
            street: proyecto.address?.street || '',
            suite: proyecto.address?.suite || '',
            city: proyecto.address?.city || '',
            zipcode: proyecto.address?.zipcode || '',
            geo: {
              lat: proyecto.address?.geo?.lat || '',
              lng: proyecto.address?.geo?.lng || ''
            }
          },
          phone: proyecto.phone || '',
          website: proyecto.website || '',
          company: proyecto.company || {
            name: '',
            catchPhrase: '',
            bs: ''
          }
        };

        this.proyectosMock.push(nuevoProyecto);
        console.log('Proyecto creado (mock):', nuevoProyecto);
        
        observer.next(nuevoProyecto);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    }, 1000);
  }).pipe(
    catchError((error: HttpErrorResponse) => {
      this.errorHandler.handleError(error, 'Error creando proyecto');
      return throwError(() => error);
    })
  );
}

  // Actualizar un proyecto existente 
  public actualizarProyecto(id: number, proyecto: Partial<Proyectos>): Observable<Proyectos> {
    return new Observable<Proyectos>(observer => {
      setTimeout(() => {
        try {
          const index = this.proyectosMock.findIndex(p => p.id === id);
          if (index !== -1) {
            this.proyectosMock[index] = { ...this.proyectosMock[index], ...proyecto };
            console.log('Proyecto actualizado (mock):', this.proyectosMock[index]);
            observer.next(this.proyectosMock[index]);
          } else {
          
            const url = `${this.urlProyectos}/${id}`;
            this.http.put<any>(url, proyecto).pipe(
              map(user => this.transformarUsuarioAProyecto(user))
            ).subscribe({
              next: (proyectoActualizado) => observer.next(proyectoActualizado),
              error: (error) => observer.error(error)
            });
            return;
          }
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }, 1000);
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error actualizando proyecto ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Eliminar un proyecto 
  public eliminarProyecto(id: number): Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        try {
          const index = this.proyectosMock.findIndex(p => p.id === id);
          if (index !== -1) {
            this.proyectosMock.splice(index, 1);
            console.log('Proyecto eliminado (mock):', id);
            observer.next();
          } else {
          
            const url = `${this.urlProyectos}/${id}`;
            this.http.delete<void>(url).subscribe({
              next: () => observer.next(),
              error: (error) => observer.error(error)
            });
            return;
          }
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }, 1000);
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error eliminando proyecto ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Obtener todas las tareas
  public obtenerTareas(): Observable<Tareas[]> {
    return this.http.get<any[]>(this.urlTareas).pipe(
      map(todos => this.transformarTodosATareas(todos)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error cargando tareas');
        return throwError(() => error);
      })
    );
  }

  // Obtener tareas de un proyecto específico
  public obtenerTareasPorProyecto(projectId: number): Observable<Tareas[]> {
    const url = `${this.urlTareas}?userId=${projectId}`;
    return this.http.get<any[]>(url).pipe(
      map(todos => this.transformarTodosATareas(todos)),
      catchError((error: HttpErrorResponse) => {
        // Si falla la API, buscar en mock
        const tareasMock = this.tareasMock.filter(t => t.userId === projectId);
        if (tareasMock.length > 0) {
          return of(tareasMock);
        }
        this.errorHandler.handleError(error, `Error cargando tareas para proyecto ${projectId}`);
        return throwError(() => error);
      })
    );
  }

  // Obtener una tarea específica por ID
  public obtenerTarea(id: number): Observable<Tareas> {
    const url = `${this.urlTareas}/${id}`;
    return this.http.get<any>(url).pipe(
      map(todo => this.transformarTodoATarea(todo)),
      catchError((error: HttpErrorResponse) => {
        // Si falla la API, buscar en mock
        const tareaMock = this.tareasMock.find(t => t.id === id);
        if (tareaMock) {
          return of(tareaMock);
        }
        this.errorHandler.handleError(error, `Error cargando tarea ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Crear una nueva tarea 
  public crearTarea(tarea: Partial<Tareas>): Observable<Tareas> {
    return new Observable<Tareas>(observer => {
      setTimeout(() => {
        try {
          const nuevaTarea: Tareas = {
            userId: tarea.userId || 1,
            id: this.nextTareaId++,
            title: tarea.title || '',
            completed: tarea.completed || false
          };

          this.tareasMock.push(nuevaTarea);
          console.log('Tarea creada (mock):', nuevaTarea);
          
          observer.next(nuevaTarea);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }, 1000);
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error creando tarea');
        return throwError(() => error);
      })
    );
  }

  // Actualizar una tarea existente 
  public actualizarTarea(id: number, tarea: Partial<Tareas>): Observable<Tareas> {
    return new Observable<Tareas>(observer => {
      setTimeout(() => {
        try {
          const index = this.tareasMock.findIndex(t => t.id === id);
          if (index !== -1) {
            this.tareasMock[index] = { ...this.tareasMock[index], ...tarea };
            console.log('Tarea actualizada (mock):', this.tareasMock[index]);
            observer.next(this.tareasMock[index]);
          } else {
            // Si no existe en mock, intentar con API real
            const url = `${this.urlTareas}/${id}`;
            this.http.put<any>(url, tarea).pipe(
              map(todo => this.transformarTodoATarea(todo))
            ).subscribe({
              next: (tareaActualizada) => observer.next(tareaActualizada),
              error: (error) => observer.error(error)
            });
            return;
          }
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }, 1000);
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error actualizando tarea ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Eliminar una tarea 
  public eliminarTarea(id: number): Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        try {
          const index = this.tareasMock.findIndex(t => t.id === id);
          if (index !== -1) {
            this.tareasMock.splice(index, 1);
            console.log('Tarea eliminada (mock):', id);
            observer.next();
          } else {
            // Si no existe en mock, intentar con API real
            const url = `${this.urlTareas}/${id}`;
            this.http.delete<void>(url).subscribe({
              next: () => observer.next(),
              error: (error) => observer.error(error)
            });
            return;
          }
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }, 1000);
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error eliminando tarea ${id}`);
        return throwError(() => error);
      })
    );
  }

  
  private transformarUsuariosAProyectos(users: any[]): Proyectos[] {
    return users.map(user => this.transformarUsuarioAProyecto(user));
  }

  private transformarUsuarioAProyecto(user: any): Proyectos {
    return new Proyectos(
      user.id,
      user.name,
      user.username,
      user.email,
      user.address?.street || '',
      user.address?.suite || '',
      user.address?.city || '',
      user.address?.zipcode || '',
      user.address?.geo?.lat || '',
      user.address?.geo?.lng || '',
      user.phone || '',
      user.website || '',
      user.company?.name || '',
      user.company?.catchPhrase || '',
      user.company?.bs || ''
    );
  }

 
  private transformarTodosATareas(todos: any[]): Tareas[] {
    return todos.map(todo => this.transformarTodoATarea(todo));
  }

  private transformarTodoATarea(todo: any): Tareas {
    return new Tareas(
      todo.userId,
      todo.id,
      todo.title,
      todo.completed
    );
  }


  public getProyectosMock(): Proyectos[] {
    return this.proyectosMock;
  }

  public getTareasMock(): Tareas[] {
    return this.tareasMock;
  }
}