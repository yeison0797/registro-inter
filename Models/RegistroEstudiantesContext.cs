using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace registro_estudiantes.Models;

public partial class RegistroEstudiantesContext : DbContext
{
    public RegistroEstudiantesContext()
    {
    }

    public RegistroEstudiantesContext(DbContextOptions<RegistroEstudiantesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Clase> Clases { get; set; }

    public virtual DbSet<Estudiante> Estudiantes { get; set; }

    public virtual DbSet<Materia> Materias { get; set; }

    public virtual DbSet<Profesore> Profesores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Clase>(entity =>
        {
            entity.HasKey(e => e.ClaseId).HasName("PK__Clases__F5429553EDEE01F9");

            entity.HasOne(d => d.Estudiante).WithMany(p => p.Clases)
                .HasForeignKey(d => d.EstudianteId)
                .HasConstraintName("FK__Clases__Estudian__3D5E1FD2");

            entity.HasOne(d => d.Materia).WithMany(p => p.Clases)
                .HasForeignKey(d => d.MateriaId)
                .HasConstraintName("FK__Clases__MateriaI__3E52440B");

            entity.HasOne(d => d.Profesor).WithMany(p => p.Clases)
                .HasForeignKey(d => d.ProfesorId)
                .HasConstraintName("FK__Clases__Profesor__3F466844");
        });

        modelBuilder.Entity<Estudiante>(entity =>
        {
            entity.HasKey(e => e.EstudianteId).HasName("PK__Estudian__6F7682D82F7F2AE7");

            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Materia>(entity =>
        {
            entity.HasKey(e => e.MateriaId).HasName("PK__Materias__0D019DE192A5E76F");

            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Profesore>(entity =>
        {
            entity.HasKey(e => e.ProfesorId).HasName("PK__Profesor__4DF3F0C8366A0972");

            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
